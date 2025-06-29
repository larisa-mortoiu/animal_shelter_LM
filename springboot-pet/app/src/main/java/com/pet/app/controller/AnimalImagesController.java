package com.pet.app.controller;

import com.pet.app.dto.AnimalResponseDto;
import com.pet.app.model.AnimalImage;
import com.pet.app.repository.AnimalImageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/animals")
public class AnimalImagesController {

    private AnimalImageRepository animalImageRepository;

    public AnimalImagesController(AnimalImageRepository animalImageRepository) {
        this.animalImageRepository = animalImageRepository;
    }

    @GetMapping("/images/{animalId}")
    public ResponseEntity<List<AnimalImage>> getImagesByAnimalId(@PathVariable Long animalId) {

        try {
            List<AnimalImage> animalImages = animalImageRepository.findAllByAnimal_IdOrderByPositionAsc(animalId);
            return ResponseEntity.ok(animalImages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/images/position")
    public ResponseEntity<List<AnimalImage>> updatePosition(@RequestBody List<Map<String, Object>> body, @RequestParam Long animalId) {
        for (Map<String, Object> item : body) {
            System.out.println("ID: " + item.get("id") + ", Position: " + item.get("position"));
            System.out.println(item);
        }

        for (Map<String, Object> item : body)
        {
            AnimalImage image = animalImageRepository.findById(Long.parseLong(item.get("id").toString())).orElse(null);
            if (image != null) {
                image.setPosition(Integer.parseInt(item.get("position").toString()));
                animalImageRepository.save(image);
            }
        }

        StringBuilder string = new StringBuilder();
        for (Map<String, Object> item : body)
        {
            string.append("Image with ID: ").append(item.get("id")).append("changed position to: ").append(item.get("position")).append("\n");
        }

        System.out.println(string);

        try {
            List<AnimalImage> animalImages = animalImageRepository.findAllByAnimal_IdOrderByPositionAsc(animalId);
            return ResponseEntity.ok(animalImages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
