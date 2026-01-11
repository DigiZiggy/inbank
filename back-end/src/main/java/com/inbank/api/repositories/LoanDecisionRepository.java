package com.inbank.api.repositories;

import com.inbank.api.entities.loanDecision.LoanDecision;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LoanDecisionRepository extends JpaRepository<LoanDecision, UUID> {
}
