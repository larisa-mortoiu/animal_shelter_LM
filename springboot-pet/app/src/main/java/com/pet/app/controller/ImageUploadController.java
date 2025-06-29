package com.pet.app.controller;

import com.pet.app.model.Animal;
import com.pet.app.model.AnimalImage;
import com.pet.app.repository.AnimalImageRepository;
import com.pet.app.repository.AnimalRepository;
import com.pet.app.service.FileService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImageUploadController {

    @Autowired
    private FileService fileService;
    private final AnimalImageRepository animalImageRepository;
    private final AnimalRepository animalRepository;

    public ImageUploadController(FileService fileService, AnimalImageRepository animalImageRepository, AnimalRepository animalRepository) {
        this.fileService = fileService;
        this.animalImageRepository = animalImageRepository;
        this.animalRepository = animalRepository;
    }

    @Transactional
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {

            String imageUrl = fileService.saveImage(file);

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Eroare la încărcarea fișierului");
        }
    }

    @Transactional
    @PostMapping("/uploadImagesList/{animalId}")
    public ResponseEntity<?> uploadImages(
            @PathVariable Long animalId,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("positions") List<Integer> positions) throws IOException {

        if (files.size() != positions.size()) {
            return ResponseEntity
                    .badRequest()
                    .body("Numărul de fișiere și de poziții trebuie să coincidă");
        }

        List<AnimalImage> savedImages = new ArrayList<>();

        try{

            Animal animal = animalRepository.findById(animalId)
                            .orElseThrow(() -> new EntityNotFoundException("Animalul cu id-ul: " + animalId + "nu a fost gasit!"));
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                int pos = positions.get(i);
                String fileName = fileService.saveImage(file);

                AnimalImage image = new AnimalImage();
                image.setImageUrl(fileName);
                image.setPosition(pos);
                image.setAnimal(animal);
                savedImages.add(animalImageRepository.save(image));
            }
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

        try {
            List<AnimalImage> animalImages = animalImageRepository.findAllByAnimal_IdOrderByPositionAsc(animalId);
            return ResponseEntity.ok(animalImages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Resource resource = fileService.loadImage(imageName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"").contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(404).body(null);
        }
    }
}