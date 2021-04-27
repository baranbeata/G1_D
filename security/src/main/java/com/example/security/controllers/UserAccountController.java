package com.example.security.controllers;

import com.example.security.payload.request.ConfirmResetRequest;
import com.example.security.payload.request.ForgotPasswordRequest;
import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.security.services.EmailSenderService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import com.example.security.models.User;
import com.example.security.models.ConfirmationToken;
import com.example.security.payload.request.LoginRequest;
import com.example.security.payload.request.SignupRequest;
import com.example.security.payload.response.JwtResponse;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.jwt.JwtUtils;
import com.example.security.security.services.UserDetailsImpl;

import javax.validation.Valid;

@Controller
public class UserAccountController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    // https://stackabuse.com/password-encoding-with-spring-security/
    // to encode our password
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    /**
     * Display the forgot password page and form
     */
   /* @RequestMapping(value="/forgot-password", method=RequestMethod.GET)
    public ModelAndView displayResetPassword(ModelAndView modelAndView, User user) {
        modelAndView.addObject("user", user);
        modelAndView.setViewName("forgotPassword");
        return modelAndView;
    } */

    /**
     * Receive email of the user, create token and send it via email to the user
     */
    @PostMapping("/forgot-password")
    @CrossOrigin(origins="http://localhost:8081")
    public ResponseEntity<?> forgotUserPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        User existingUser = userRepository.findByEmailIgnoreCase(forgotPasswordRequest.getEmail());
        if(existingUser != null) {
            // create token
            ConfirmationToken confirmationToken = new ConfirmationToken(existingUser);

            // save it
            confirmationTokenRepository.save(confirmationToken);

            // create the email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(existingUser.getEmail());
            mailMessage.setSubject("Complete Password Reset!");
            mailMessage.setFrom("babacompanyproject@gmail.com");
            mailMessage.setText("To complete the password reset process, please click here: "
                    +"http://localhost:8081/confirm-reset?confirmationToken="+confirmationToken.getConfirmationToken());

            emailSenderService.sendEmail(mailMessage);

            return ResponseEntity.ok(new MessageResponse("Request to reset password received. Check your inbox for the reset link."));

        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("This email does not exist!"));
        }

    }


    //@RequestMapping(value="/confirm-reset", method= {RequestMethod.GET, RequestMethod.POST})
   // ResponseEntity<?> forgotUserPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest)
    @GetMapping("/confirm-reset")
    public ResponseEntity<?> validateResetToken(@RequestParam String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null) {
            User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
           // user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("Valid link."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("The link is invalid or broken!"));
        }
    }

    /**
     * Receive the token from the link sent via email and display form to reset password
     */
    @PostMapping( "/reset-password")
    public ResponseEntity<?> resetUserPassword(@Valid @RequestBody ConfirmResetRequest confirmResetRequest) {
         ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmResetRequest.getConfirmationToken());

        if(token.getUser().getEmail() != null) {
            // use email to find user
            User tokenUser = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
           // tokenUser.setEnabled(true);
            tokenUser.setPassword(encoder.encode(tokenUser.getPassword()));
            // System.out.println(tokenUser.getPassword());
            userRepository.save(tokenUser);
            return ResponseEntity.ok(new MessageResponse("Password successfully reset. You can now log in with the new credentials."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("The link is invalid or broken!"));
        }
    }


    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ConfirmationTokenRepository getConfirmationTokenRepository() {
        return confirmationTokenRepository;
    }

    public void setConfirmationTokenRepository(ConfirmationTokenRepository confirmationTokenRepository) {
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

    public EmailSenderService getEmailSenderService() {
        return emailSenderService;
    }

    public void setEmailSenderService(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

}