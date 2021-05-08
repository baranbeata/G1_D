package com.example.security.security.services;

import com.example.security.models.Product;
import com.example.security.repository.ProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    // productRepository constructor injection

    private ProductRepository productRepository;
    @Override
    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProduct(long id) {
        return productRepository.findById(id);

    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }
}
