package com.example.security.controllers;

import com.example.security.models.User;
import com.example.security.payload.request.ChangePasswordRequest;
import com.example.security.repository.UserRepository;
import com.example.security.security.services.EmailSenderService;
import com.example.security.security.services.UserDetailsImpl;
import org.junit.Before;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.rules.ExpectedException;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;



import static org.junit.jupiter.api.Assertions.*;

@ComponentScan({"com.example.security.security"})

@WebMvcTest(ChangePasswordController.class)
class ChangePasswordControllerTest {

    @Autowired
    private ChangePasswordController changepasswordcontroller;

    @MockBean
    public JavaMailSender sender;

    @Autowired
    private MockMvc mvc;

    private WebApplicationContext context;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @MockBean
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    void changePassword_withGivenWrongOldPassword_ThenIncorrect() throws Exception {

     //   PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setId(1L);
        user.setUsername("tests");
        user.setPassword(passwordEncoder.encode("tests123"));
        user.setEmail("tests@test.com");

        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito.when(userRepository.findAll()).thenReturn(users);
        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(java.util.Optional.of(user));

        ChangePasswordRequest change = new ChangePasswordRequest();
        change.setUsername("tests");
        change.setPassword("tests12345");
        change.setNewpassword("newpassword");

        ResponseEntity<?> responseEntity = changepasswordcontroller.changePassword(change);

        assertEquals(400, responseEntity.getStatusCode().value());
    }

    @Test
    void changePassword_withGivenCorrectOldPassword_ThenOk() throws Exception {

     //   PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setId(1L);
        user.setUsername("tests");
        user.setPassword(passwordEncoder.encode("tests123"));
        user.setEmail("tests@test.com");

        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito.when(userRepository.findAll()).thenReturn(users);
        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(java.util.Optional.of(user));

        ChangePasswordRequest change = new ChangePasswordRequest();
        change.setUsername("tests");
        change.setPassword("tests123");
        change.setNewpassword("newpassword");

        ResponseEntity<?> responseEntity = changepasswordcontroller.changePassword(change);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);

        //"Your password was changed successfully!"
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

    @Test
    void changePassword_withNonExistingUser() throws Exception {

        try
        {
            ChangePasswordRequest change = new ChangePasswordRequest();
            change.setUsername("tests");
            change.setPassword("tests123");
            change.setNewpassword("newpassword");
            ResponseEntity<?> responseEntity = changepasswordcontroller.changePassword(change);
            fail("Should have thrown SomeException but did not!");
        }
        catch( final RuntimeException e )
        {
            final String msg = "Error: User with given username not found.";
            assertEquals(msg, e.getMessage());
        }
    }
}
