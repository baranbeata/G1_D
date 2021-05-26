package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.models.Shop;
import com.example.security.repository.ProductRepository;
import com.example.security.repository.ShopRepository;
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
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable long id) {

        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);

    }

    @DeleteMapping("/products/{id}")
    @CrossOrigin
    public @NotNull
    ResponseEntity<Long> deleteProduct(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
