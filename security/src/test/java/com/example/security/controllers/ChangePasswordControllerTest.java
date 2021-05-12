package com.example.security.controllers;

import com.example.security.models.ConfirmationToken;
import com.example.security.models.User;
import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.WebSecurityConfig;
import com.example.security.security.services.EmailSenderService;
import com.example.security.security.services.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.mail.iap.Response;
import javassist.NotFoundException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.webservices.client.WebServiceClientTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@AutoConfigureMockMvc
public class ChangePasswordControllerTest {
    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(changepasswordcontroller).build();
    }
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private ConfirmationTokenRepository confirmationTokenRepository;

    @InjectMocks
    private ChangePasswordController changepasswordcontroller;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(changepasswordcontroller);
    }

    @WithMockUser
    @Test
    public void sendEmail_emailNonExistentInDatabase() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                .post("/profile/change_password"))
            //    .content(asJsonString("aaa.bbb@abc.com"))
              //  .contentType(MediaType.APPLICATION_JSON)
             //   .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

       // assertNull(userRepository.findByEmailIgnoreCase("aaa.bbb@abc.com"));

    }



    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
