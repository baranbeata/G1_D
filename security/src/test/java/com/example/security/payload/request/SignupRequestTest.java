package com.example.security.payload.request;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SignupRequestTest {

    @Autowired
    SignupRequest signupRequest = new SignupRequest();

    @Test
    void getUsernameTest() {
        signupRequest.setUsername("user");
        String name = signupRequest.getUsername();
        assertEquals("user", name);
    }

    @Test
    void setUsernameTest() {
        signupRequest.setUsername("admin");
        String name = signupRequest.getUsername();
        assertEquals("admin", name);
    }

    @Test
    void getEmailTest() {
        signupRequest.setEmail("user@example.com");
        String email = signupRequest.getEmail();
        assertEquals("user@example.com", email);
    }

    @Test
    void setEmailTest() {
        signupRequest.setEmail("user@example.com");
        String email = signupRequest.getEmail();
        assertEquals("user@example.com", email);
    }

    @Test
    void getPasswordTest() {
        signupRequest.setPassword("Abcdefghijk12345");
        String pass = signupRequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void setPasswordTest() {
        signupRequest.setPassword("Abcdefghijk12345");
        String pass = signupRequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void getRoleTest() {
        Set<String> set = new HashSet<>();
        set.add("ROLE_USER");
        signupRequest.setRole(set);
        Set<String> role = signupRequest.getRole();
        assertEquals(set, role);
    }

    @Test
    void setRoleTest() {
        Set<String> set = new HashSet<>();
        set.add("ROLE_USER");
        signupRequest.setRole(set);
        Set<String> role = signupRequest.getRole();
        assertEquals(set, role);
    }
}