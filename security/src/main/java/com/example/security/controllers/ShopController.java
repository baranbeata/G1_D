package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.models.Shop;
import com.example.security.repository.ShopRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ShopController {

    @Autowired
    ShopRepository shoprepository;

    @GetMapping("/shops")
    public @NotNull
    ResponseEntity<Iterable<Shop>> getShops(@RequestParam(required = false) Iterable<Shop> shops) {
        return new ResponseEntity<>(shoprepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/shops/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<Optional<Shop>> getSingleShop(@RequestParam("id") int id) {

        return new ResponseEntity<>(shoprepository.findById((long) id), HttpStatus.OK);

    }

}
