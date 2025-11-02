package com.safronov.formula.demo.videoservice.repository;

import com.safronov.formula.demo.videoservice.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, String> {
}
