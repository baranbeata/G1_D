package com.example.security.payload.request;

import org.springframework.lang.NonNull;

public class ConfirmResetRequest {

    @NonNull
    private String confirmationToken;

    @NonNull
    private String password;

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
