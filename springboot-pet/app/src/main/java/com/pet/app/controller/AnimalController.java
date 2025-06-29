package com.pet.app.controller;

import com.pet.app.dto.AnimalRequestDTO;
import com.pet.app.dto.AnimalResponseDto;
import com.pet.app.repository.AnimalRepository;
import com.pet.app.model.Animal;
import com.pet.app.service.AnimalService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    @GetMapping("/type/{animalType}")
    public ResponseEntity<AnimalResponseDto> getAnimalsByType(@PathVariable String animalType,
                                                              @RequestParam(value="adopted", required=false) Boolean adopted) {

        List<Animal> allAnimals = animalRepository.findAll();

        if(adopted != null) {
            allAnimals = allAnimals.stream()
                    .filter(animal -> animal.isAdopted() == adopted)
                    .collect(Collectors.toList());
        }

        Map<String, Long> totalCounts = allAnimals.stream()
                .collect(Collectors.groupingBy(animal -> animal.getAnimalType().toLowerCase(), Collectors.counting()));

        totalCounts.put("toate", (long) allAnimals.size());

        List<Animal> filteredAnimals;
        if (animalType.equalsIgnoreCase("toate")) {
            filteredAnimals = allAnimals;
        } else {
//            filteredAnimals = animalRepository.findAnimalsByAnimalTypeEqualsIgnoreCase(animalType);
            assert adopted != null;
            filteredAnimals = animalRepository.findAnimalsByAdoptedAndAnimalTypeEqualsIgnoreCase(adopted,animalType);
        }

        AnimalResponseDto responseDto = new AnimalResponseDto(filteredAnimals, totalCounts);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Animal>> getAnimalsByTypeAndSize(
            @RequestParam String animalType,
            @RequestParam String size,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge) {

        List<Animal> allAnimals = animalRepository.findAll();

        Stream<Animal> filteredStream = allAnimals.stream().filter(animal -> !animal.isAdopted());

        if (!animalType.equalsIgnoreCase("toate")) {
            filteredStream = filteredStream.filter(a -> a.getAnimalType().equalsIgnoreCase(animalType));
        }

        if (!size.equalsIgnoreCase("toate")) {
            filteredStream = filteredStream.filter(a -> a.getSize().equalsIgnoreCase(size));
        }


        if (minAge != null) {
            filteredStream = filteredStream.filter(animal -> Integer.parseInt(animal.getAge().replaceAll("[^0-9]", "")) >= minAge);
        }

        if (maxAge != null) {
            filteredStream = filteredStream.filter(animal -> Integer.parseInt(animal.getAge().replaceAll("[^0-9]", "")) <= maxAge);
        }

        List<Animal> filteredAnimals = filteredStream.collect(Collectors.toList());
        return ResponseEntity.ok().body(filteredAnimals);
    }



    @PostMapping
    public Animal addAnimal(@RequestBody Animal animal) {
        return animalRepository.save(animal);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        try {
            Animal updatedDog = animalService.updateAnimal(id, animal)  ;
            return ResponseEntity.ok(updatedDog);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDog(@PathVariable Long id) {
        try {
            animalService.deleteAnimal(id);
            return ResponseEntity.ok("Animalul a fost șters cu succes!");
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PatchMapping("/adopt/{id}")
    public ResponseEntity<?> adoptAnimal(@PathVariable Long id) {
        try
        {
            Animal updatedAnimal = animalService.adoptAnimal(id);
            return ResponseEntity.ok(updatedAnimal);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Animal> addAnimal(@RequestBody AnimalRequestDTO request) {
        Animal newAnimal = new Animal();
        newAnimal.setName(request.name());
        newAnimal.setBreed(request.breed());
        newAnimal.setSize(request.size());
        newAnimal.setAge(request.age());
        newAnimal.setTemperament(request.temperament());
        newAnimal.setGender(request.gender());
        newAnimal.setAnimalType(request.animalType());
        newAnimal.setImage(request.image());
        newAnimal.setSterilized(request.sterilized());
        newAnimal.setMicrochip(request.microchip());
        newAnimal.setSpecialFood(request.specialFood());
        newAnimal.setFriendly(request.friendly());
        newAnimal.setChildSafe(request.childSafe());

        Animal savedAnimal = animalService.saveAnimal(newAnimal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
    }

}

