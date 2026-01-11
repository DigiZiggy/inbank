package com.inbank.api.dtos;

import com.inbank.api.entities.loanDecision.DecisionStatus;

public record LoanDecisionResponseDto(
        DecisionStatus decision,       // "APPROVED" or "NOT APPROVED"
        Integer approvedAmount,        // nullable when NOT APPROVED due to debt/no valid option
        Integer approvedPeriodMonths,  // nullable when NOT APPROVED
        Integer creditModifier,        // nullable for debt
        String message
) {}
