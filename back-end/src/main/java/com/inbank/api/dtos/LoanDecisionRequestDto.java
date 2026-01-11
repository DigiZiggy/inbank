package com.inbank.api.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoanDecisionRequestDto(
    @NotBlank
    String personalCode,

    @NotNull
    @Min(2000) @Max(10000)
    Integer loanAmount,

    @NotNull
    @Min(12) @Max(60)
    Integer loanPeriodMonths
){}
