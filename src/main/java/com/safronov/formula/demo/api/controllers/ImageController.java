package com.safronov.formula.demo.api.controllers;

import com.safronov.formula.demo.domain.interfaces.image.GetImageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "*")
public class ImageController {

    private final GetImageService getImageService;

    public ImageController(GetImageService getImageService) {
        this.getImageService = getImageService;
    }

    @GetMapping("/drivers/{filename}")
    public ResponseEntity<Resource> getDriverImage(@PathVariable String filename) {
        try {
            Resource resource = getImageService.get("static/images/drivers/", filename);
            String contentType = getImageService.determineContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/cars/{filename}")
    public ResponseEntity<Resource> getTeamCarImage(@PathVariable String filename) {
        try {
            Resource resource = getImageService.get("static/images/cars/", filename);
            String contentType = getImageService.determineContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/teams/{filename}")
    public ResponseEntity<Resource> getTeamLogoImage(@PathVariable String filename) {
        try {
            Resource resource = getImageService.get("static/images/teams/", filename);
            String contentType = getImageService.determineContentType(filename);

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
            Resource resource = getImageService.get("static/images/backgrounds/", filename);
            String contentType = getImageService.determineContentType(filename);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}