package com.safronov.formula.demo.videoservice.service;

import com.safronov.formula.demo.videoservice.model.Video;
import com.safronov.formula.demo.videoservice.service.dto.PlaylistItemsResponse;
import com.safronov.formula.demo.videoservice.service.dto.VideoDurationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Component
public class VideoProcessor {

    private static final Logger log = LoggerFactory.getLogger(VideoProcessor.class);

    public List<Video> processPlaylistItems(List<PlaylistItemsResponse.Item> items,
                                            List<VideoDurationResponse.Item> durations,
                                            int minDurationSeconds,
                                            int maxVideos) {
        List<Video> videos = new ArrayList<>();

        for (PlaylistItemsResponse.Item item : items) {
            if (videos.size() >= maxVideos) {
                break;
            }

            if (!isValidItem(item)) {
                continue;
            }

            String videoId = item.snippet().resourceId().videoId();
            Long durationSeconds = findDuration(videoId, durations);

            if (durationSeconds == null || durationSeconds < minDurationSeconds) {
                log.debug("Skipping Shorts video {} ({} seconds)", videoId, durationSeconds);
                continue;
            }

            Video video = createVideo(item, durationSeconds);
            videos.add(video);
        }

        return videos;
    }

    private boolean isValidItem(PlaylistItemsResponse.Item item) {
        return item != null
                && item.snippet() != null
                && item.snippet().resourceId() != null;
    }

    private Video createVideo(PlaylistItemsResponse.Item item, Long durationSeconds) {
        String videoId = item.snippet().resourceId().videoId();
        String title = item.snippet().title();
        OffsetDateTime publishedAt = parsePublishedAt(item.snippet().publishedAt());
        String thumbnailUrl = extractBestThumbnail(item.snippet().thumbnails());

        return new Video(videoId, title, publishedAt, durationSeconds, thumbnailUrl);
    }

    private Long findDuration(String videoId, List<VideoDurationResponse.Item> durations) {
        return durations.stream()
                .filter(item -> item.id().equals(videoId))
                .findFirst()
                .map(this::parseDuration)
                .orElse(null);
    }

    private Long parseDuration(VideoDurationResponse.Item item) {
        try {
            return Duration.parse(item.contentDetails().duration()).getSeconds();
        } catch (DateTimeParseException e) {
            log.warn("Failed to parse duration for video {}", item.id());
            return null;
        }
    }

    private OffsetDateTime parsePublishedAt(String publishedAt) {
        if (publishedAt == null) {
            return null;
        }

        try {
            return OffsetDateTime.parse(publishedAt);
        } catch (DateTimeParseException e) {
            log.warn("Failed to parse published date: {}", publishedAt);
            return null;
        }
    }

    private String extractBestThumbnail(PlaylistItemsResponse.Thumbnails thumbnails) {
        if (thumbnails == null) {
            return null;
        }

        if (thumbnails.high() != null) {
            return thumbnails.high().url();
        }
        if (thumbnails.medium() != null) {
            return thumbnails.medium().url();
        }
        if (thumbnails.standard() != null) {
            return thumbnails.standard().url();
        }
        if (thumbnails.defaultThumb() != null) {
            return thumbnails.defaultThumb().url();
        }

        return null;
    }
}
