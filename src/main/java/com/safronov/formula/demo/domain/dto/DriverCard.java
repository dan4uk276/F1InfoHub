package com.safronov.formula.demo.domain.dto;

public record DriverCard(
        Integer id,
        String name,
        int number,
        String teamName,
        String country,
        int podiums,
        int points,
        String imageFilename
) {}
