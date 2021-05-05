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
public class UserAccountControllerTest {
    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(userAccountController).build();
    }
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private ConfirmationTokenRepository confirmationTokenRepository;

    @InjectMocks
    private UserAccountController userAccountController;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(userAccountController);
    }

    @Test
    public void sendEmail_emailNonExistentInDatabase() throws Exception {
        mockMvc.perform( MockMvcRequestBuilders
                .post("/forgot-password")
                .content(asJsonString("aaa.bbb@abc.com"))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        assertNull(userRepository.findByEmailIgnoreCase("aaa.bbb@abc.com"));

    }

    @Test
    public void sendEmail_emailExistentInDatabase() throws Exception {

        User usr = new User("usr", "nati.bienkowska@gmail.com", "pass");
        when(userRepository.findByEmailIgnoreCase("nati.bienkowska@gmail.com")).thenReturn(usr);
        mockMvc.perform( MockMvcRequestBuilders
                .post("/forgot-password")
                .content(asJsonString("nati.bienkowska@gmail.com"))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));
              //  .andExpect(status().isOk());

        //verify(userRepository).findByEmailIgnoreCase("nati.bienkowska@gmail.com");
        assertEquals(usr,userRepository.findByEmailIgnoreCase("nati.bienkowska@gmail.com"));
    }

    @Test
    public void validateResetToken_tokenNonExistent() throws Exception {

        User usr = new User("usr", "nati.bienkowska@gmail.com", "pass");
        ConfirmationToken confirmationToken = new ConfirmationToken(usr);

        //when(confirmationTokenRepository.findByConfirmationToken("12345")).thenReturn(confirmationToken);
        mockMvc.perform( MockMvcRequestBuilders
                .get("/confirm-reset")
                .content(asJsonString(confirmationToken.getConfirmationToken()))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void validateResetToken_tokenExistent() throws Exception {

        User usr = new User("usr", "nati.bienkowska@gmail.com", "pass");
        ConfirmationToken confirmationToken = new ConfirmationToken(usr);

        when(confirmationTokenRepository.findByConfirmationToken("12345")).thenReturn(confirmationToken);
        mockMvc.perform( MockMvcRequestBuilders
                .get("/confirm-reset")
                .content(asJsonString(confirmationToken.getConfirmationToken()))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));
               // .andExpect(status().isBadRequest());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
