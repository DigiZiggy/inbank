package com.inbank.api.services;

import com.inbank.api.dtos.LoanDecisionRequestDto;
import com.inbank.api.dtos.LoanDecisionResponseDto;
import com.inbank.api.entities.loanDecision.DecisionStatus;
import com.inbank.api.entities.loanDecision.LoanDecision;
import com.inbank.api.exceptions.UnknownPersonException;
import com.inbank.api.repositories.LoanDecisionRepository;
import com.inbank.api.external.registry.person.PersonProfile;
import com.inbank.api.external.registry.person.PersonRegistryClient;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
public class LoanDecisionServiceImpl implements LoanDecisionService {

    private static final int MIN_AMOUNT = 2000;
    private static final int MAX_AMOUNT = 10000;
    private static final int MIN_PERIOD = 12;
    private static final int MAX_PERIOD = 60;

    private final PersonRegistryClient registryClient;
    private final LoanDecisionRepository repository;

    public LoanDecisionServiceImpl(PersonRegistryClient registryClient, LoanDecisionRepository repository) {
        this.registryClient = registryClient;
        this.repository = repository;
    }

    @Transactional
    public LoanDecisionResponseDto evaluateLoanDecision(LoanDecisionRequestDto request) {
        PersonProfile profile;
        try {
            profile = registryClient.getProfile(request.personalCode());
        } catch (UnknownPersonException ex) {
            saveLoanDecision(request, DecisionStatus.NOT_APPROVED, null, null, null);

            return new LoanDecisionResponseDto(
                    DecisionStatus.NOT_APPROVED,
                    null,
                    null,
                    null,
                    "Unable to evaluate loan: personal code not found in registry."
            );
        }

        if (profile.hasDebt()) {
            saveLoanDecision(request, DecisionStatus.NOT_APPROVED, null, null, null);
            return new LoanDecisionResponseDto(
                    DecisionStatus.NOT_APPROVED,
                    null,
                    null,
                    null,
                    "Applicant has debt. No loan can be approved."
            );
        }

        int modifier = profile.creditModifier() == null ? 0 : profile.creditModifier();

        // Start with requested period, try to find a period that can approve at least MIN_AMOUNT.
        int chosenPeriod = findFirstSuitablePeriod(modifier, request.loanPeriodMonths());

        if (chosenPeriod == -1) {
            saveLoanDecision(request, DecisionStatus.NOT_APPROVED, null, null, modifier);
            return new LoanDecisionResponseDto(
                    DecisionStatus.NOT_APPROVED,
                    null,
                    null,
                    modifier,
                    "No suitable loan amount found within allowed periods."
            );
        }

        int maxApproved = computeMaxApprovedAmount(modifier, chosenPeriod);
        saveLoanDecision(request, DecisionStatus.APPROVED, maxApproved, chosenPeriod, modifier);

        return new LoanDecisionResponseDto(
                DecisionStatus.APPROVED,
                maxApproved,
                chosenPeriod,
                modifier,
                "Approved maximum possible amount for the selected (or adjusted) period."
        );
    }

    private int computeMaxApprovedAmount(int modifier, int periodMonths) {
        long maxAmount = (long) modifier * (long) periodMonths;
        return (int) Math.min(MAX_AMOUNT, maxAmount);
    }

    private int findFirstSuitablePeriod(int modifier, int requestedPeriod) {
        int start = clamp(requestedPeriod);

        for (int period = start; period <= MAX_PERIOD; period++) {
            int maxApproved = computeMaxApprovedAmount(modifier, period);
            if (maxApproved >= MIN_AMOUNT) {
                return period;
            }
        }
        return -1;
    }

    private int clamp(int value) {
        return Math.clamp(value, MIN_PERIOD, MAX_PERIOD);
    }

    public void saveLoanDecision(LoanDecisionRequestDto request, DecisionStatus decision, Integer approvedAmount, Integer approvedPeriod, Integer modifier) {
        LoanDecision loanDecision = convertToLoanDecision(request, decision, approvedAmount, approvedPeriod, modifier);
        repository.save(loanDecision);
    }

    private LoanDecision convertToLoanDecision(LoanDecisionRequestDto request, DecisionStatus decision, Integer approvedAmount, Integer approvedPeriod, Integer modifier) {
        return LoanDecision.builder()
                .id(UUID.randomUUID())
                .personalCode(request.personalCode())
                .requestedAmount(request.loanAmount())
                .requestedPeriod(request.loanPeriodMonths())
                .decision(decision)
                .approvedAmount(approvedAmount)
                .approvedPeriod(approvedPeriod)
                .creditModifier(modifier)
                .createdAt(OffsetDateTime.now())
                .build();
    }
}
