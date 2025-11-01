package com.safronov.formula.demo.application.services.image;

import com.safronov.formula.demo.domain.interfaces.image.GetImageService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class GetImageServiceImpl implements GetImageService {

    private static final Map<String, String> CONTENT_TYPES = Map.of(
            "png", "image/png",
            "jpg", "image/jpeg",
            "jpeg", "image/jpeg",
            "svg", "image/svg",
            "avif", "image/avif"
    );

    @Override
    public Resource get(String path, String filename) throws IOException{

        Resource resource = new ClassPathResource(path + filename);

        if (!resource.exists()) {
            throw new IOException("File not found: " + filename);
        }

        return resource;
    }

    @Override
    public String determineContentType(String filename) {
        String contentType = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        return CONTENT_TYPES.getOrDefault(contentType, "image/avif");
    }
}
