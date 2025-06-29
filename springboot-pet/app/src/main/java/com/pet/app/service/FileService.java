package com.pet.app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileService {

    @Value("${upload.directory}")
    private String uploadDir;

    // salvare imagine
    public String saveImage(MultipartFile file) throws IOException {
        // verificare extensie fisier
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path targetLocation = Path.of(uploadDir + fileName);
        Files.createDirectories(targetLocation.getParent());

        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return "http://localhost:8090/api/images/" + fileName;
    }

    // incarcare imagine
    public Resource loadImage(String imageName) throws IOException {
        Path path = Path.of(uploadDir + imageName);
        File file = path.toFile();

        if (!file.exists()) {
            throw new IOException("Imaginea nu a fost găsită");
        }

        return new FileSystemResource(file);
    }
}
