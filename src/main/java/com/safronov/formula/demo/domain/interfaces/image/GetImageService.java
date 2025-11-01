package com.safronov.formula.demo.domain.interfaces.image;

import org.springframework.core.io.Resource;

import java.io.IOException;

public interface GetImageService {
    Resource get(String path, String filename) throws IOException;
    String determineContentType(String filename);
}
