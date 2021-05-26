package com.example.security.repository;
import com.example.security.models.InfoEdit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoEditRepository extends JpaRepository<InfoEdit, Long> {
    InfoEdit findByName(String name);
    InfoEdit findBySurname(String surname);
    InfoEdit findByPesel(String pesel);
    InfoEdit findByTel(String tel);
    InfoEdit findByUserId(String userId);
}
