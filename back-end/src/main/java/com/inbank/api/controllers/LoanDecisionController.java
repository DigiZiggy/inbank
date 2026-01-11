package com.inbank.api.controllers;

import com.inbank.api.dtos.LoanDecisionRequestDto;
import com.inbank.api.dtos.LoanDecisionResponseDto;
import com.inbank.api.services.LoanDecisionService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class LoanDecisionController {

    private final LoanDecisionService service;

    public LoanDecisionController(LoanDecisionService service) {
        this.service = service;
    }

    @PostMapping("/loan-decision")
    public ResponseEntity<LoanDecisionResponseDto> decision(@Valid @RequestBody LoanDecisionRequestDto request) {
        return ResponseEntity.ok(service.evaluateLoanDecision(request));
    }
}
