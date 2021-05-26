package com.example.security.repository;

import com.example.security.models.Delivery;
import com.example.security.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery,Long>{

    Optional<Delivery> findBySupplier(User supplier);
    List<Delivery> findAll();
    Optional<Delivery> findById(String id);
}
