package com.example.security.payload.request;

import org.springframework.lang.NonNull;

import java.util.Set;

import javax.validation.constraints.*;

public class SignupRequest {
    @NonNull
    private String username;

    @NonNull
    private String email;

    @NonNull
    private String password;

    private Set<String> role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRole() { return this.role; }

    public void setRole(Set<String> role) { this.role = role;}
}
