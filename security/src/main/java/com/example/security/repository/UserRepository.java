package com.example.security.repository;

import com.example.security.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByEmailIgnoreCase(String emailId);
    Boolean existsByUsername(String username);
    Optional<User> findById(Long id);

    Boolean existsByEmail(String email);
}
