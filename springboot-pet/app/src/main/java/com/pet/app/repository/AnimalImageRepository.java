package com.pet.app.repository;


import com.pet.app.model.Animal;
import com.pet.app.model.AnimalImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalImageRepository extends JpaRepository<AnimalImage, Long> {
    List<AnimalImage> findAllByAnimal_IdOrderByPositionAsc(Long animalId);
}
