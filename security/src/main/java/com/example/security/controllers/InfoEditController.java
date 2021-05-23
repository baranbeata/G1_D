package com.example.security.controllers;

import com.example.security.models.Info;
import com.example.security.models.User;
import com.example.security.payload.request.InfoEditRequest;
import com.example.security.payload.request.SignupRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.InfoRepository;
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
    InfoRepository infoRepository;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/user")
    public @NotNull
    ResponseEntity<Iterable<Info>> getInfo(@RequestParam(required = false) Iterable<Info> info) {
        return new ResponseEntity<>(infoRepository.findAll(), HttpStatus.OK);
    }

   // @PostMapping("/user/infoEdit-form")
    //public ResponseEntity<?> infoedit(@Valid @RequestBody InfoEditRequest infoEditRequest){
        /*if (!userRepository.existsByUsername(infoEditRequest.getUsername())) {
            System.out.format("user %s ", userRepository.existsByUsername(infoEditRequest.getUsername()));
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not found!"));
        }*/
        //System.out.format("user %s ", userRepository.findByUsername(infoEditRequest.getUsername()));

       /* Optional<User> currentUser= this.userRepository.findByUsername(infoEditRequest.getUsername_fk());
        Info info = infoRepository.findByUsername_fk(currentUser.get().getUsername());
        info.setName(infoEditRequest.getName());
        info.setSurname(infoEditRequest.getSurname());
        info.setPesel(infoEditRequest.getPesel());
        info.setTel(infoEditRequest.getTel());

        infoRepository.save(info);*/

        //return ResponseEntity.ok(new MessageResponse("Info edited successfully!"));
   // }


}
