package com.example.security.controllers;

import com.example.security.models.User;
import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@AutoConfigureMockMvc
public class ChangePasswordControllerTest {

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




  /*  @Before
    public void init() {
        User user = userRepository.findByEmailIgnoreCase("test@test.com");
        if (user == null) {
            User superUser = new User("testowanie", "test@test.com", passwordEncoder.encode("test"));
            userRepository.save(superUser);
        } else {
            user.setPassword(passwordEncoder.encode("test"));
            userRepository.save(user);
        }

        RestAssured.port = port;
        RestAssured.baseURI = "http://localhost";
     //   System.out.printf("url %s %d",URL, port);
        URL = "profile/change_password";
        formConfig = new FormAuthConfig("/signin", "Ola123", "ola123");
    }

    @After
    public void resetUserPassword() {
        final User user = userRepository.findByEmailIgnoreCase("test@test.com");
        user.setPassword(passwordEncoder.encode("test"));
        userRepository.save(user);
    }
*/
    @Test
    public void givenLoggedInUser_whenChangingPassword_thenCorrect() throws Exception {

        String password = "test123";
        String newpassword = "nowetest123";
        User user = new User("test100","test@wp.pl","test123");


        mockMvc.perform( MockMvcRequestBuilders
                .post("/profile/change_password")
                .param("password", password)
                .param("newpassword", newpassword))
                .andExpect(status().is(404));

    }

    @Test
    public void givenLoggedInUser_whenChangingPasswordWithBadOldPassword_thenInCorrect() throws Exception {

        String password = "bad_password";
        String newpassword = "nowetest123";
        User user = new User("test100","test@wp.pl","test123");


        mockMvc.perform( MockMvcRequestBuilders
                .post("/profile/change_password")
                .param("password", password)
                .param("newpassword", newpassword))
                .andExpect(status().is(404));

    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}