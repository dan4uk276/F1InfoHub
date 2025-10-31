package com.safronov.formula.demo.api.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "*")
public class ImageController {

    @GetMapping("/drivers/{filename}")
    public ResponseEntity<Resource> getDriverImage(@PathVariable String filename) {
        try {
            Resource resource = new ClassPathResource("static/images/drivers/" + filename);

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Определяем Content-Type
            String contentType = "image/avif";
            if (filename.endsWith(".png")) {
                contentType = "image/png";
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                contentType = "image/jpeg";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/backgrounds/{filename}")
    public ResponseEntity<Resource> getDriverCardBackgroundImage(@PathVariable String filename) {
        try {
            Resource resource = new ClassPathResource("static/images/backgrounds/" + filename);

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Определяем Content-Type
            String contentType = "image/avif";
            if (filename.endsWith(".png")) {
                contentType = "image/png";
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                contentType = "image/jpeg";
            } else if (filename.endsWith(".svg")) {
                contentType = "image/svg";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}