package com.safronov.formula.demo.videoservice.controller;

import com.safronov.formula.demo.videoservice.model.Video;
import com.safronov.formula.demo.videoservice.repository.VideoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin(origins = "*") // позволяет доступ другим микросервисам
public class VideoController {

    private final VideoRepository repo;

    public VideoController(VideoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return repo.findAll();
    }
}

