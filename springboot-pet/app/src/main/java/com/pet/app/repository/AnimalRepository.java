package com.pet.app.repository;

import com.pet.app.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
//    List<Animal> findAnimalsByAnimalTypeEqualsIgnoreCase(String animalType);

    List<Animal> findAnimalsByAdoptedAndAnimalTypeEqualsIgnoreCase(boolean adopted,String animalType);
    List<Animal> findAllByAdopted(Boolean adopted);
}
