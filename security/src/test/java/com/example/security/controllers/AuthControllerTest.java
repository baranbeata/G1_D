package com.example.security.controllers;

import com.example.security.models.User;
import com.example.security.payload.request.LoginRequest;
import com.example.security.payload.request.SignupRequest;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.services.EmailSenderService;
import com.example.security.security.services.UserDetailsImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import static org.junit.jupiter.api.Assertions.*;

@ComponentScan({"com.example.security.security"})

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private AuthController authController;

    @Autowired
    private EmailSenderService emailSenderService;

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
    private UserDetailsImpl userDetails;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Test
    void authenticateUserTest() throws Exception {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setId(1L);
        user.setUsername("beata");
        // user.setPassword("$2a$10$VZ/QcKWnzcgFIDQYKoqM1.2aHyokoSFtD0e3skv7wKG08nXvHmQPe");
        // also testing password encoding
        user.setPassword(passwordEncoder.encode("beata493"));
        user.setEmail("beata493@poczta.onet.pl");

        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito.when(userRepository.findAll()).thenReturn(users);
        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(java.util.Optional.of(user));

        System.out.println(userRepository.findAll());
        System.out.println(userRepository.findByUsername(user.getUsername()));

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("beata");
        loginRequest.setPassword("beata493");

        ResponseEntity<?> responseEntity = authController.authenticateUser(loginRequest);

        assertEquals(200, responseEntity.getStatusCode().value());
    }

    @Test
    void registerUserTest() {
        System.out.println(userRepository.findAll());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setId(0L);
        user.setUsername("beata");
        user.setPassword(passwordEncoder.encode("beata493"));
        user.setEmail("beata493@poczta.onet.pl");

        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito.when(userRepository.findAll()).thenReturn(users);
        Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(java.util.Optional.of(user));

        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("test");
        signupRequest.setPassword("test123");
        signupRequest.setEmail("test@example.com");
        Set<String> roles = new HashSet<>();
        signupRequest.setRole(roles);

        ResponseEntity<?> responseEntity = authController.registerUser(signupRequest);

        assertEquals(200, responseEntity.getStatusCode().value());
    }
}