package com.example.security.repository;
import com.example.security.models.InfoEdit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.List;

@Repository
public interface InfoEditRepository extends JpaRepository<InfoEdit, Long> {
    //InfoEdit findByUsername(String Username);
    InfoEdit findByName(String name);
    InfoEdit findBySurname(String surname);
    InfoEdit findByPesel(String pesel);
    InfoEdit findByTel(String tel);
    InfoEdit findByUserId(Long userId);
}
