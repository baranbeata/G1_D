package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.security.services.ProductService;
import com.sun.istack.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    ProductService productService;

    @GetMapping("/products")
    public @NotNull
    ResponseEntity<Iterable<Product>> getProducts(@RequestParam(required = false) Iterable<Product> products) {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }
}
