package com.pet.app.service;

import com.pet.app.model.Animal;
import com.pet.app.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal updateAnimal(Long id, Animal animal) {

        Animal existinganimal = animalRepository.findById(id).orElseThrow(() -> new RuntimeException("Câinele nu a fost găsit"));

        existinganimal.setName(animal.getName());
        existinganimal.setBreed(animal.getBreed());
        existinganimal.setAge(animal.getAge());
        existinganimal.setImage(animal.getImage());
        existinganimal.setGender(animal.getGender());
        existinganimal.setSize(animal.getSize());
        existinganimal.setTemperament(animal.getTemperament());
        existinganimal.setChildSafe(animal.getChildSafe());
        existinganimal.setFriendly(animal.getFriendly());
        existinganimal.setMicrochip(animal.getMicrochip());
        existinganimal.setSpecialFood(animal.getSpecialFood());
        existinganimal.setSterilized(animal.getSterilized());

        return animalRepository.save(existinganimal);
    }

    public Animal adoptAnimal(Long id) {

        Animal existingAnimal = animalRepository.findById(id).orElseThrow(() -> new RuntimeException("Animalul nu a fost găsit"));
        existingAnimal.setAdopted(true);
        return animalRepository.save(existingAnimal);
    }

    public void deleteAnimal(Long id) {
        Optional<Animal> optAnimal = animalRepository.findById(id);
        if (optAnimal.isPresent()) {
            Animal animal = optAnimal.get();

            if (animal.getImage() != null && !animal.getImage().isEmpty()) {

                String fileName = animal.getImage().substring(animal.getImage().lastIndexOf("images/") + "images/".length());
                Path imagePath = Paths.get("uploads", "images", fileName);
                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    throw new RuntimeException("Eroare la ștergerea imaginii: " + e.getMessage());
                }
            }

            animalRepository.deleteById(id);
        } else {
            throw new RuntimeException("Animalul cu ID-ul " + id + " nu există.");
        }
    }

    public Animal saveAnimal(Animal newAnimal) {
        return animalRepository.save(newAnimal);
    }

    public List<Animal> findAnimalsByAdopted(Boolean adopted) {
        return animalRepository.findAllByAdopted(adopted);
    }



}



