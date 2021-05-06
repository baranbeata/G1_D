package com.example.security.payload.request;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;


public class ChangePasswordRequest {
    @NonNull
    private String username;

    @NonNull
    private String password;

    @NonNull
    private String newpassword;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }


    public String getnewPassword() {return newpassword;}
}