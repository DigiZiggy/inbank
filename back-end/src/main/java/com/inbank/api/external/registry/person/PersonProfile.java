package com.inbank.api.external.registry.person;

public record PersonProfile(
        boolean hasDebt,
        Integer creditModifier
) {}
