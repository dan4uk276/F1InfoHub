package com.safronov.formula.demo.videoservice.service;

import com.safronov.formula.demo.videoservice.model.Video;
import com.safronov.formula.demo.videoservice.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class YoutubeApiClient {

    private static final Logger log = LoggerFactory.getLogger(YoutubeApiClient.class);
    private static final String YOUTUBE_API_BASE_URL = "https://www.googleapis.com";
    private static final long REQUEST_DELAY_MS = 1000;
    private static final int BATCH_SIZE = 50;

    private final WebClient webClient;
    private final VideoProcessor videoProcessor;

    public YoutubeApiClient(VideoProcessor videoProcessor) {
        this.videoProcessor = videoProcessor;
        this.webClient = WebClient.create(YOUTUBE_API_BASE_URL);
    }

    public String getUploadsPlaylistId(String channelId, String apiKey) {
        try {
            ChannelsResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/youtube/v3/channels")
                            .queryParam("part", "contentDetails")
                            .queryParam("id", channelId)
                            .queryParam("key", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(ChannelsResponse.class)
                    .block();

            return extractUploadsPlaylistId(response);
        } catch (WebClientResponseException e) {
            log.error("YouTube API error when fetching channel contentDetails: {} - {}",
                    e.getStatusCode(), e.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("Error fetching uploads playlist id", e);
            return null;
        }
    }

    public List<Video> fetchVideosFromPlaylist(String playlistId, String apiKey,
                                               int maxVideos, int minDurationSeconds) {
        List<Video> videos = new ArrayList<>();
        String pageToken = null;

        while (videos.size() < maxVideos) {
            PlaylistItemsResponse response = fetchPlaylistPage(playlistId, pageToken, apiKey);
            if (response == null || response.items() == null || response.items().isEmpty()) {
                break;
            }

            List<String> videoIds = extractVideoIds(response);
            List<VideoDurationResponse.Item> durations = fetchVideoDurations(videoIds, apiKey);

            videos.addAll(videoProcessor.processPlaylistItems(
                    response.items(),
                    durations,
                    minDurationSeconds,
                    maxVideos - videos.size()
            ));

            pageToken = response.nextPageToken();
            if (pageToken == null) {
                break;
            }

            sleep(REQUEST_DELAY_MS);
        }

        return videos;
    }

    private PlaylistItemsResponse fetchPlaylistPage(String playlistId, String pageToken, String apiKey) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> {
                        var builder = uriBuilder
                                .path("/youtube/v3/playlistItems")
                                .queryParam("part", "snippet,contentDetails")
                                .queryParam("playlistId", playlistId)
                                .queryParam("maxResults", BATCH_SIZE)
                                .queryParam("key", apiKey);

                        if (pageToken != null) {
                            builder.queryParam("pageToken", pageToken);
                        }

                        return builder.build();
                    })
                    .retrieve()
                    .bodyToMono(PlaylistItemsResponse.class)
                    .block();
        } catch (WebClientResponseException e) {
            log.error("YouTube API error when fetching playlistItems: {} - {}",
                    e.getStatusCode(), e.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("Error fetching playlist items", e);
            return null;
        }
    }

    private List<VideoDurationResponse.Item> fetchVideoDurations(List<String> videoIds, String apiKey) {
        List<VideoDurationResponse.Item> result = new ArrayList<>();

        if (videoIds.isEmpty()) {
            return result;
        }

        for (int i = 0; i < videoIds.size(); i += BATCH_SIZE) {
            List<String> batch = videoIds.subList(i, Math.min(i + BATCH_SIZE, videoIds.size()));

            try {
                VideoDurationResponse response = webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .path("/youtube/v3/videos")
                                .queryParam("part", "contentDetails")
                                .queryParam("id", String.join(",", batch))
                                .queryParam("key", apiKey)
                                .build())
                        .retrieve()
                        .bodyToMono(VideoDurationResponse.class)
                        .block();

                if (response != null && response.items() != null) {
                    result.addAll(response.items());
                }
            } catch (Exception e) {
                log.error("Error fetching video durations", e);
            }

            sleep(REQUEST_DELAY_MS);
        }

        return result;
    }

    private String extractUploadsPlaylistId(ChannelsResponse response) {
        if (response == null || response.items() == null || response.items().isEmpty()) {
            return null;
        }

        ChannelsResponse.Item item = response.items().get(0);
        if (item == null || item.contentDetails() == null
                || item.contentDetails().relatedPlaylists() == null) {
            return null;
        }

        return item.contentDetails().relatedPlaylists().uploads();
    }

    private List<String> extractVideoIds(PlaylistItemsResponse response) {
        return response.items().stream()
                .filter(item -> item != null && item.snippet() != null
                        && item.snippet().resourceId() != null)
                .map(item -> item.snippet().resourceId().videoId())
                .toList();
    }

    private void sleep(long milliseconds) {
        try {
            TimeUnit.MILLISECONDS.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.warn("Sleep interrupted", e);
        }
    }
}