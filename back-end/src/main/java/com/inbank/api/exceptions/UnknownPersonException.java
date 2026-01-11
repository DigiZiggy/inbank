package com.inbank.api.exceptions;

public class UnknownPersonException extends RuntimeException {

    public UnknownPersonException(String personalCode) {
        super("Unknown personal code: " + personalCode);
    }
}
