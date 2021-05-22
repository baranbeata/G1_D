package com.example.security.repository;

import com.example.security.models.Shop;
import com.example.security.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findByName(String name);
    List<Shop> findAll();
    Optional<Shop> findById(String id);
}
