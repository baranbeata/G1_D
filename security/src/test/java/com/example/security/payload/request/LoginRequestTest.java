package com.example.security.payload.request;

import org.junit.jupiter.api.Test;
import com.example.security.payload.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class LoginRequestTest {

    @Autowired
    LoginRequest loginRequest = new LoginRequest();

    @Test
    void getUsernameTest() {
        loginRequest.setUsername("user");
        String name = loginRequest.getUsername();
        assertEquals("user", name);
    }

    @Test
    void setUsernameTest() {
        loginRequest.setUsername("admin");
        String name = loginRequest.getUsername();
        assertEquals("admin", name);
    }

    @Test
    void getPasswordTest() {
        loginRequest.setPassword("Abcdefghijk12345");
        String pass = loginRequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void setPasswordTest() {
        loginRequest.setPassword("Abcdefghijk12345");
        String pass = loginRequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }
}