package com.example.security.repository;

import com.example.security.models.Product;
import com.example.security.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);

    List<Product> findAll();
    Optional<Product> findById(String id);
    //Product findBySize(String size);
   // Boolean existsByUsername(String username);

   // Boolean existsByEmail(String email);
}
