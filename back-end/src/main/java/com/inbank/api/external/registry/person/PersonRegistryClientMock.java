package com.inbank.api.external.registry.person;

import com.inbank.api.exceptions.UnknownPersonException;
import org.springframework.stereotype.Component;

@Component
public class PersonRegistryClientMock implements PersonRegistryClient {

    @Override
    public PersonProfile getProfile(String personalCode) {
        return switch (personalCode) {
            case "49002010965" -> new PersonProfile(true, null);      // debt
            case "49002010976" -> new PersonProfile(false, 100);      // segment 1
            case "49002010987" -> new PersonProfile(false, 300);      // segment 2
            case "49002010998" -> new PersonProfile(false, 1000);     // segment 3
            default -> throw new UnknownPersonException(personalCode);
        };
    }
}
