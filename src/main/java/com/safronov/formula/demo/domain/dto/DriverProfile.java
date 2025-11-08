package com.safronov.formula.demo.domain.dto;

public record DriverProfile(
    String name,
    int number,
    String teamName,
    String country,
    int podiums,
    int points,
    String imageFilename,
    int gpEntered,
    int wdc,
    String highestRaceFinish,
    String highestGridPosition,
    String dateOfBirth,
    String placeOfBirth,
    String biography,
    String quote,
    DriverSeasonStat driverSeasonStat
){}
