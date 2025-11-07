package com.safronov.formula.demo.videoservice.service;

import com.safronov.formula.demo.videoservice.model.Video;
import com.safronov.formula.demo.videoservice.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class YoutubeFetchService {

    private static final Logger log = LoggerFactory.getLogger(YoutubeFetchService.class);
    private static final String F1_CHANNEL_ID = "UCXQBAleLZGKLSfNrqsjDOyg";
    private static final int MAX_VIDEOS_PER_FETCH = 50;
    private static final int MIN_VIDEO_DURATION_SECONDS = 60;

    private final VideoRepository videoRepository;
    private final YoutubeApiClient youtubeApiClient;

    @Value("${youtube.api.key}")
    private String apiKey;

    public YoutubeFetchService(VideoRepository videoRepository,
                               YoutubeApiClient youtubeApiClient,
                               VideoProcessor videoProcessor) {
        this.videoRepository = videoRepository;
        this.youtubeApiClient = youtubeApiClient;
    }

    @Scheduled(fixedRateString = "${youtube.scheduler.fetch-rate}",
            initialDelayString = "${youtube.scheduler.initial-delay}")
    public void scheduledFetch() {
        log.info("Starting scheduled YouTube video fetch...");
        try {
            fetchAndSaveLatestVideos(F1_CHANNEL_ID);
        } catch (Exception e) {
            log.error("Error fetching videos from YouTube", e);
        }
        log.info("Finished scheduled YouTube video fetch");
    }

    public void fetchAndSaveLatestVideos(String channelId) {
        String uploadsPlaylistId = youtubeApiClient.getUploadsPlaylistId(channelId, apiKey);
        if (uploadsPlaylistId == null) {
            log.warn("Couldn't find uploads playlist for channel {}", channelId);
            return;
        }

        log.info("Fetching up to {} non-Shorts videos for playlist {}", MAX_VIDEOS_PER_FETCH, uploadsPlaylistId);

        List<Video> videos = youtubeApiClient.fetchVideosFromPlaylist(
                uploadsPlaylistId,
                apiKey,
                MAX_VIDEOS_PER_FETCH,
                MIN_VIDEO_DURATION_SECONDS
        );

        VideoSaveResult result = saveOrUpdateVideos(videos);

        log.info("Processed {} videos from channel {}: {} new, {} updated",
                videos.size(), channelId, result.getSavedCount(), result.getUpdatedCount());
    }

    private VideoSaveResult saveOrUpdateVideos(List<Video> videos) {
        int savedCount = 0;
        int updatedCount = 0;

        for (Video video : videos) {
            Optional<Video> existing = videoRepository.findById(video.getId());

            if (existing.isPresent()) {
                updateExistingVideo(existing.get(), video);
                updatedCount++;
            } else {
                videoRepository.save(video);
                savedCount++;
            }
        }

        return new VideoSaveResult(savedCount, updatedCount);
    }

    private void updateExistingVideo(Video existing, Video newData) {
        existing.setTitle(newData.getTitle());
        existing.setPublishedAt(newData.getPublishedAt());
        existing.setDuration(newData.getDuration());
        existing.setThumbnailUrl(newData.getThumbnailUrl());
        videoRepository.save(existing);
    }

    private static class VideoSaveResult {
        private final int savedCount;
        private final int updatedCount;

        public VideoSaveResult(int savedCount, int updatedCount) {
            this.savedCount = savedCount;
            this.updatedCount = updatedCount;
        }

        public int getSavedCount() {
            return savedCount;
        }

        public int getUpdatedCount() {
            return updatedCount;
        }
    }
}