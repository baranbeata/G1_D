package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.repository.ProductRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products")
    public @NotNull
    ResponseEntity<Iterable<Product>> getProducts(@RequestParam(required = false) Iterable<Product> products) {
        return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public @NotNull
    ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable long id) {
            return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);
            
    }

}
