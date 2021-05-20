package com.example.security.controllers;

import javax.validation.Valid;
import com.example.security.models.User;
import com.example.security.payload.request.ChangePasswordRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.UserRepository;
import com.example.security.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Controller
@RequestMapping("/api/auth")

public class ChangePasswordController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/profile/change_password")
    @CrossOrigin(origins="http://localhost:8081")
  //  @PreAuthorize("hasRole('READ_PRIVILEGE')")
public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changepasswordrequest){

        User currentUser= this.userRepository.findByUsername(changepasswordrequest.getUsername()).
                orElseThrow(() -> new RuntimeException("Error: User with given username not found."));

        if(!encoder.matches(changepasswordrequest.getPassword(), currentUser.getPassword())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Given password is incorrect!"));
        }

       else {
            currentUser.setPassword(encoder.encode(changepasswordrequest.getnewPassword()));
            userRepository.save(currentUser);

            return ResponseEntity.ok(new MessageResponse("Your password was changed successfully!"));
        }
    }

}
