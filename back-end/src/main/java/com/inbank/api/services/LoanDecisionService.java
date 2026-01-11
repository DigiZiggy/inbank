package com.inbank.api.services;

import com.inbank.api.dtos.LoanDecisionRequestDto;
import com.inbank.api.dtos.LoanDecisionResponseDto;
import com.inbank.api.entities.loanDecision.DecisionStatus;

public interface LoanDecisionService {

    LoanDecisionResponseDto evaluateLoanDecision(LoanDecisionRequestDto req);

    void saveLoanDecision(LoanDecisionRequestDto request, DecisionStatus decision, Integer approvedAmount, Integer approvedPeriod, Integer modifier);
}
