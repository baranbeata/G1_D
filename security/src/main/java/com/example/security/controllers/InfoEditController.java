package com.example.security.controllers;

import com.example.security.models.InfoEdit;
import com.example.security.models.Shop;
import com.example.security.models.User;
import com.example.security.payload.request.InfoEditRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.InfoEditRepository;
import com.example.security.repository.ShopRepository;
import com.example.security.repository.UserRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class InfoEditController {
    @Autowired
    InfoEditRepository infoEditRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShopRepository shopRepository;


    @GetMapping("/user")
    public @NotNull
    ResponseEntity<Optional<InfoEdit>> getInfo(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return new ResponseEntity<>(infoEditRepository.findById(user.get().getId()), HttpStatus.OK);
    }

    @GetMapping("/manager")
    @ResponseBody
    public @NotNull
    ResponseEntity<Iterable<InfoEdit>> getEmployees(@RequestParam String username) {
        Optional<User> manager = userRepository.findByUsername(username);
        Optional<Shop> shop = shopRepository.findById(manager.get().getShop().getId());
        List<User> employees = shop.get().getUsers();
        List<Long> ids = new ArrayList<>();
        int listSize = employees.size();
        System.out.println(listSize);
        for (User employee : employees) {
            //if(employee.getId().equals(manager.get().getId())) continue;
                ids.add(employee.getId());
        }
        int idsSize = ids.size();
        List<InfoEdit> infos = new ArrayList<>();
        for (Long id : ids) {
            infos.add(infoEditRepository.findByUserId(id));
        }

        return new ResponseEntity<>(infos, HttpStatus.OK);
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
