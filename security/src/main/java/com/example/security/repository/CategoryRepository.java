package com.example.security.repository;

import com.example.security.models.Category;
import com.example.security.models.ECategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(ECategory name);
}
