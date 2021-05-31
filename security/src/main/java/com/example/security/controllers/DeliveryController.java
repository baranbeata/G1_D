package com.example.security.controllers;

import com.example.security.models.Delivery;
import com.example.security.models.Product;
import com.example.security.repository.CategoryRepository;
import com.example.security.repository.DeliveryRepository;
import com.example.security.repository.UserRepository;
import com.example.security.repository.TypeRepository;
import com.example.security.security.jwt.JwtUtils;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DeliveryController {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/deliveries")
    public @NotNull
    ResponseEntity<Iterable<Delivery>> getDeliveries(@RequestParam(required = false) Iterable<Delivery> deliveries) {
        return new ResponseEntity<>(deliveryRepository.findAll(), HttpStatus.OK);
    }

}
