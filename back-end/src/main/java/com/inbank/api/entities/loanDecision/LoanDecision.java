package com.inbank.api.entities.loanDecision;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class LoanDecision {

    @Id
    private UUID id;

    @Column(name = "personal_code", nullable = false, length = 11)
    private String personalCode;

    @Column(name = "requested_amount", nullable = false)
    private int requestedAmount;

    @Column(name = "requested_period", nullable = false)
    private int requestedPeriod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DecisionStatus decision;

    @Column(name = "approved_amount")
    private Integer approvedAmount;

    @Column(name = "approved_period")
    private Integer approvedPeriod;

    @Column(name = "credit_modifier")
    private Integer creditModifier;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
