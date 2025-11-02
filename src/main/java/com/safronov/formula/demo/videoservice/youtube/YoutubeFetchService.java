package com.safronov.formula.demo.videoservice.youtube;

import com.safronov.formula.demo.videoservice.model.Video;
import com.safronov.formula.demo.videoservice.repository.VideoRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class YoutubeFetchService {

    private final VideoRepository videoRepository;
    private final WebClient webClient = WebClient.create("https://www.googleapis.com");

    @Value("${youtube.api.key}")
    private String apiKey;

    // Задержка между запросами к API (в миллисекундах)
    private static final long REQUEST_DELAY_MS = 1000; // 1 секунда между запросами

    // Максимум видео для загрузки за раз
    private static final int MAX_VIDEOS_PER_FETCH = 50;

    // Official Formula 1 channel id (example)
    private static final String F1_CHANNEL_ID = "UCB_qr75-ydFVKSF9Dmo6izg";

    /**
     * Scheduled run: каждые 24 часа
     * Используй initialDelay чтобы не запускать сразу при старте приложения
     */
    @Scheduled(fixedRate = 86400000, initialDelay = 10000) // 10 сек задержка после старта
    public void scheduledFetch() {
        log.info("Starting scheduled YouTube video fetch...");
        try {
            fetchAndSaveLatestVideos(F1_CHANNEL_ID);
        } catch (Exception e) {
            log.error("Error fetching videos from YouTube", e);
        }
        log.info("Finished scheduled YouTube video fetch");
    }

    /**
     * Главный метод: получает uploads playlist id, затем берет первые 50 видео и сохраняет.
     */
    public void fetchAndSaveLatestVideos(String channelId) {
        String uploadsPlaylistId = getUploadsPlaylistId(channelId);
        if (uploadsPlaylistId == null) {
            log.warn("Couldn't find uploads playlist for channel {}", channelId);
            return;
        }

        sleep(REQUEST_DELAY_MS);
        log.info("Fetching up to {} non-Shorts videos for playlist {}", MAX_VIDEOS_PER_FETCH, uploadsPlaylistId);

        List<Video> videosToSave = new ArrayList<>();
        String pageToken = null;

        while (videosToSave.size() < MAX_VIDEOS_PER_FETCH) {
            PlaylistItemsResponse resp = fetchPlaylistItems(uploadsPlaylistId, pageToken, 50);
            if (resp == null || resp.items == null || resp.items.isEmpty()) break;

            // Собираем videoId для запроса длительности
            List<String> videoIds = resp.items.stream()
                    .filter(item -> item != null && item.snippet != null && item.snippet.resourceId != null)
                    .map(item -> item.snippet.resourceId.videoId)
                    .toList();

            List<VideoDurationResponse.Item> durations = fetchVideoDurations(videoIds);

            for (PlaylistItemsResponse.Item item : resp.items) {
                if (videosToSave.size() >= MAX_VIDEOS_PER_FETCH) break;
                if (item == null || item.snippet == null || item.snippet.resourceId == null) continue;

                String videoId = item.snippet.resourceId.videoId;
                String title = item.snippet.title;
                OffsetDateTime publishedAt = parsePublishedAt(item.snippet.publishedAt);
                String thumb = getThumbnail(item.snippet.thumbnails);

                Long durationSeconds = getDuration(videoId, durations);

                // Фильтруем Shorts: меньше 60 секунд
                if (durationSeconds == null || durationSeconds < 60) {
                    log.info("Skipping Shorts video {} ({} seconds)", videoId, durationSeconds);
                    continue;
                }

                videosToSave.add(new Video(videoId, title, publishedAt, durationSeconds, thumb));
            }

            pageToken = resp.nextPageToken;
            if (pageToken == null) break;

            sleep(REQUEST_DELAY_MS); // небольшая задержка между запросами
        }

        // Сохраняем или обновляем видео в БД
        int savedCount = 0, updatedCount = 0;
        for (Video v : videosToSave) {
            Optional<Video> existing = videoRepository.findById(v.getId());
            if (existing.isPresent()) {
                Video e = existing.get();
                e.setTitle(v.getTitle());
                e.setPublishedAt(v.getPublishedAt());
                e.setDuration(v.getDuration());
                e.setThumbnailUrl(v.getThumbnailUrl());
                videoRepository.save(e);
                updatedCount++;
            } else {
                videoRepository.save(v);
                savedCount++;
            }
        }

        log.info("Processed {} videos from channel {}: {} new, {} updated",
                videosToSave.size(), channelId, savedCount, updatedCount);
    }

// Вспомогательные методы

    private OffsetDateTime parsePublishedAt(String publishedAt) {
        if (publishedAt == null) return null;
        try { return OffsetDateTime.parse(publishedAt); }
        catch (DateTimeParseException ex) { return null; }
    }

    private String getThumbnail(PlaylistItemsResponse.Thumbnails thumbnails) {
        if (thumbnails == null) return null;
        if (thumbnails.high != null) return thumbnails.high.url;
        if (thumbnails.medium != null) return thumbnails.medium.url;
        if (thumbnails.standard != null) return thumbnails.standard.url;
        if (thumbnails.defaultThumb != null) return thumbnails.defaultThumb.url;
        return null;
    }

    private Long getDuration(String videoId, List<VideoDurationResponse.Item> durations) {
        for (VideoDurationResponse.Item dItem : durations) {
            if (dItem.getId().equals(videoId)) {
                try { return Duration.parse(dItem.getContentDetails().getDuration()).getSeconds(); }
                catch (DateTimeParseException ex) { return null; }
            }
        }
        return null;
    }


    /**
     * Получаем uploads playlist id из channels?part=contentDetails&id=...
     */
    private String getUploadsPlaylistId(String channelId) {
        try {
            ChannelsResponse resp = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/youtube/v3/channels")
                            .queryParam("part", "contentDetails")
                            .queryParam("id", channelId)
                            .queryParam("key", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(ChannelsResponse.class)
                    .block();

            if (resp == null || resp.items == null || resp.items.isEmpty()) return null;
            ChannelsResponse.Item it = resp.items.get(0);
            if (it == null || it.contentDetails == null || it.contentDetails.relatedPlaylists == null) return null;
            return it.contentDetails.relatedPlaylists.uploads;
        } catch (WebClientResponseException wex) {
            log.error("YouTube API error when fetching channel contentDetails: {} - {}", wex.getRawStatusCode(), wex.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("Error fetching uploads playlist id", e);
            return null;
        }
    }

    /**
     * Получаем страницу playlistItems
     */
    private PlaylistItemsResponse fetchPlaylistItems(String playlistId, String pageToken, int maxResults) {
        try {
            PlaylistItemsResponse resp = webClient.get()
                    .uri(uriBuilder -> {
                        var b = uriBuilder
                                .path("/youtube/v3/playlistItems")
                                .queryParam("part", "snippet,contentDetails")
                                .queryParam("playlistId", playlistId)
                                .queryParam("maxResults", String.valueOf(maxResults))
                                .queryParam("key", apiKey);
                        if (pageToken != null) b.queryParam("pageToken", pageToken);
                        return b.build();
                    })
                    .retrieve()
                    .bodyToMono(PlaylistItemsResponse.class)
                    .block();
            return resp;
        } catch (WebClientResponseException wex) {
            log.error("YouTube API error when fetching playlistItems: {} - {}", wex.getRawStatusCode(), wex.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("Error fetching playlist items", e);
            return null;
        }
    }

    // Метод для запроса durations через videos API
    private List<VideoDurationResponse.Item> fetchVideoDurations(List<String> videoIds) {
        List<VideoDurationResponse.Item> result = new ArrayList<>();
        if (videoIds.isEmpty()) return result;

        // YouTube API лимит: до 50 видео за один запрос
        for (int i = 0; i < videoIds.size(); i += 50) {
            List<String> batch = videoIds.subList(i, Math.min(i + 50, videoIds.size()));
            try {
                VideoDurationResponse resp = webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .path("/youtube/v3/videos")
                                .queryParam("part", "contentDetails")
                                .queryParam("id", String.join(",", batch))
                                .queryParam("key", apiKey)
                                .build())
                        .retrieve()
                        .bodyToMono(VideoDurationResponse.class)
                        .block();

                if (resp != null && resp.getItems() != null) result.addAll(resp.getItems());
            } catch (Exception e) {
                log.error("Error fetching video durations", e);
            }

            sleep(REQUEST_DELAY_MS); // задержка между запросами
        }

        return result;
    }

    /**
     * Безопасная задержка
     */
    private void sleep(long milliseconds) {
        try {
            TimeUnit.MILLISECONDS.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.warn("Sleep interrupted", e);
        }
    }

    // ---------------------------
    // DTOs для YouTube API responses
    // ---------------------------

    @Data
    @NoArgsConstructor
    public static class ChannelsResponse {
        private List<Item> items;

        @Data
        @NoArgsConstructor
        public static class Item {
            private ContentDetails contentDetails;
        }

        @Data
        @NoArgsConstructor
        public static class ContentDetails {
            private RelatedPlaylists relatedPlaylists;
        }

        @Data
        @NoArgsConstructor
        public static class RelatedPlaylists {
            private String uploads;
        }
    }

    @Data
    @NoArgsConstructor
    public static class PlaylistItemsResponse {
        private String nextPageToken;
        private List<Item> items;

        @Data
        @NoArgsConstructor
        public static class Item {
            public ContentDetails contentDetails;
            private Snippet snippet;
        }

        @Data
        @NoArgsConstructor
        public static class Snippet {
            private String publishedAt; // ISO date string
            private String title;
            private ResourceId resourceId;
            private Thumbnails thumbnails;
        }

        @Data
        @NoArgsConstructor
        public static class ResourceId {
            private String videoId;
        }

        @Data
        @NoArgsConstructor
        public static class Thumbnails {
            // YouTube возвращает разные размеры миниатюр
            @com.fasterxml.jackson.annotation.JsonProperty("default")
            private Thumbnail defaultThumb;
            private Thumbnail medium;
            private Thumbnail high;
            private Thumbnail standard;
        }

        @Data
        @NoArgsConstructor
        public static class Thumbnail {
            private String url;
            private int width;
            private int height;
        }

        @Data
        @NoArgsConstructor
        public static class ContentDetails {
            public String videoId;         // ID видео
            public String videoPublishedAt;// дата публикации видео
            public String duration;        // длительность видео в ISO 8601, например PT5M30S
            public Boolean isCaption;      // есть ли субтитры
            // есть и другие поля, например, licensedContent и т.д.
        }
    }

    // DTO для videos API (только contentDetails)
    @Data
    @NoArgsConstructor
    public static class VideoDurationResponse {
        private List<Item> items;

        @Data
        @NoArgsConstructor
        public static class Item {
            private String id;
            private ContentDetails contentDetails;
        }

        @Data
        @NoArgsConstructor
        public static class ContentDetails {
            private String duration;
        }

    }
}