package com.example.security.payload.request;

import org.springframework.lang.NonNull;

public class ConfirmResetRequest {

    @NonNull
    private String confirmationToken;

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String email) {
        this.confirmationToken = confirmationToken;
    }
}
