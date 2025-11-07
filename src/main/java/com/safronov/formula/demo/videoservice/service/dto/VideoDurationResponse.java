package com.safronov.formula.demo.videoservice.service.dto;

import java.util.List;

public record VideoDurationResponse(List<Item> items) {

    public record Item(String id, ContentDetails contentDetails) {}

    public record ContentDetails(String duration) {}
}
