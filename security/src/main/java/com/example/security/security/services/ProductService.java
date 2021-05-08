package com.example.security.security.services;

import com.example.security.models.Product;
import com.example.security.repository.ProductRepository;

import java.util.Optional;

public interface ProductService {

    public Iterable<Product> getAllProducts();

    public Optional<Product> getProduct(long id);

    public Product save(Product product);
}
