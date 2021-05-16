package com.example.security.repository;

import com.example.security.models.ConfirmationToken;
import com.example.security.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
    long deleteByConfirmationToken(String confirmationToken);
}
