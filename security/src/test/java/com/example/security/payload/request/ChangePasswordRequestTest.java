package com.example.security.payload.request;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class ChangePasswordRequestTest {

    @Autowired
    ChangePasswordRequest changepasswordrequest=new ChangePasswordRequest();

    @Test
    void getUsernameTest() {
        changepasswordrequest.setUsername("user");
        String name = changepasswordrequest.getUsername();
        assertEquals("user", name);
    }

    @Test
    void setUsernameTest() {
        changepasswordrequest.setUsername("admin");
        String name = changepasswordrequest.getUsername();
        assertEquals("admin", name);
    }

    @Test
    void getPasswordTest() {
        changepasswordrequest.setPassword("Abcdefghijk12345");
        String pass = changepasswordrequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void setPasswordTest() {
        changepasswordrequest.setPassword("Abcdefghijk12345");
        String pass = changepasswordrequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void setNewpasswordTest() {
        changepasswordrequest.setPassword("Abcdefghijk12345");
        String pass = changepasswordrequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }

    @Test
    void getnewPasswordTest() {
        changepasswordrequest.setPassword("Abcdefghijk12345");
        String pass = changepasswordrequest.getPassword();
        assertEquals("Abcdefghijk12345", pass);
    }
}