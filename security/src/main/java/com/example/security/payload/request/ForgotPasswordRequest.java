package com.example.security.payload.request;

import org.springframework.lang.NonNull;

import java.util.Set;

public class ForgotPasswordRequest {

    @NonNull
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
