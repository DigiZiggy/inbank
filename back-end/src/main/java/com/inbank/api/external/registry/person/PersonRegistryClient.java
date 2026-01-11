package com.inbank.api.external.registry.person;

public interface PersonRegistryClient {
    PersonProfile getProfile(String personalCode);
}
