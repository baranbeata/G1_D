package com.example.security.repository;
import com.example.security.models.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InfoRepository extends JpaRepository<Info, Long> {
    Info findByName(String name);
    Info findBySurname(String surname);
    Info findByPesel(String pesel);
    Info findByTel(String tel);
    Boolean existById(Long id);

}
