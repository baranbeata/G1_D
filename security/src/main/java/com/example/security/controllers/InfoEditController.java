package com.example.security.controllers;
import javax.validation.Valid;
import com.example.security.models.User;
import com.example.security.payload.request.InfoEditRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.InfoRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")

public class InfoEditController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    InfoRepository infoRepository;

    @PostMapping("/profile/profile_form")

    public ResponseEntity<?> editInfo(@Valid @RequestBody InfoEditRequest infoEditRequest){

        User currentUser= this.userRepository.findByUsername(infoEditRequest.getUsername()).
                orElseThrow(() -> new RuntimeException("Error: User with given username not found."));

        if(currentUser != null) {


        }


        userRepository.save(currentUser);
        return ResponseEntity.ok(new MessageResponse("Your data were changed successfully!"));
    }



}


