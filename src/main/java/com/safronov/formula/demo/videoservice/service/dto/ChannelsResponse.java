package com.safronov.formula.demo.videoservice.service.dto;

import java.util.List;

public record ChannelsResponse(List<Item> items) {

    public record Item(ContentDetails contentDetails) {}

    public record ContentDetails(RelatedPlaylists relatedPlaylists) {}

    public record RelatedPlaylists(String uploads) {}
}
