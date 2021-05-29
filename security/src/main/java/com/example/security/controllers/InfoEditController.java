package com.example.security.controllers;

import com.example.security.models.InfoEdit;
import com.example.security.models.User;
import com.example.security.payload.request.InfoEditRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.InfoEditRepository;
import com.example.security.repository.UserRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class InfoEditController {
    @Autowired
    InfoEditRepository infoEditRepository;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/user")
    public @NotNull
    ResponseEntity<Optional<InfoEdit>> getInfo(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return new ResponseEntity<>(infoEditRepository.findById(user.get().getId()), HttpStatus.OK);
    }

    @PostMapping("/user/infoEdit-form")
    public ResponseEntity<?> infoedit(@Valid @RequestBody InfoEditRequest infoEditRequest){
        if (!userRepository.existsByUsername(infoEditRequest.getUsername())) {
            System.out.format("user %s ", userRepository.existsByUsername(infoEditRequest.getUsername()));
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found!"));
        }

        Optional<User> currentUser= userRepository.findByUsername(infoEditRequest.getUsername());
        InfoEdit infoEdit = new InfoEdit(infoEditRequest.getName(), infoEditRequest.getSurname(), infoEditRequest.getPesel(), infoEditRequest.getTel(), currentUser.get());

        infoEditRepository.save(infoEdit);

        return ResponseEntity.ok(new MessageResponse("Info edited successfully!"));
   }


}
