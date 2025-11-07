package com.safronov.formula.demo.videoservice.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record PlaylistItemsResponse(String nextPageToken, List<Item> items) {

    public record Item(Snippet snippet, ContentDetails contentDetails) {}

    public record Snippet(
            String publishedAt,
            String title,
            ResourceId resourceId,
            Thumbnails thumbnails
    ) {}

    public record ResourceId(String videoId) {}

    public record Thumbnails(
            @JsonProperty("default") Thumbnail defaultThumb,
            Thumbnail medium,
            Thumbnail high,
            Thumbnail standard
    ) {}

    public record Thumbnail(String url, Integer width, Integer height) {}

    public record ContentDetails(
            String videoId,
            String videoPublishedAt,
            String duration,
            Boolean isCaption
    ) {}
}
