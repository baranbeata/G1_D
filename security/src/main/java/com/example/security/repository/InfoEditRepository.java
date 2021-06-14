package com.example.security.repository;
import com.example.security.models.InfoEdit;
import com.example.security.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.List;
import java.util.Optional;

@Repository
public interface InfoEditRepository extends JpaRepository<InfoEdit, Long> {
    Optional<InfoEdit> findById(String id);
    InfoEdit findByName(String name);
    InfoEdit findBySurname(String surname);
    InfoEdit findByPesel(String pesel);
    InfoEdit findByTel(String tel);
    InfoEdit findByUserId(Long userId);
}
