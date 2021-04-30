package com.example.security.controllers;

import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.WebSecurityConfig;
import com.example.security.security.services.EmailSenderService;
import com.example.security.security.services.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import javassist.NotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.webservices.client.WebServiceClientTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {UserRepository.class, UserAccountController.class})
@ComponentScan({"com.*"})
public class UserAccountControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepositoryMock;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailSenderService emailSenderServiceMock;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Test
    public void sendEmail_emailNonExistentInDatabase() throws Exception {
        userRepositoryMock.findByEmailIgnoreCase("aaa.bbb@abc.com");

        mockMvc.perform( MockMvcRequestBuilders
                .post("/forgot-password")
                .content(asJsonString("aaa.bbb@abc.com"))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(view().name("/forgot-password"));

        verify(userRepositoryMock, times(1)).findByEmailIgnoreCase("aaa.bbb@abc.com");
    }
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
