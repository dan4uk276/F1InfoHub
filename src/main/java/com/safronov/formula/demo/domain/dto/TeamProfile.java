package com.safronov.formula.demo.domain.dto;
import java.util.List;

public record TeamProfile(
        String name,
        String fullName,
        List<DriverCard> drivers,
        String base,
        String teamChief,
        String technicalChief,
        String chassis,
        String powerUnit,
        Integer firstTeamEntry,
        Integer worldChampionships,
        String highestRaceFinish,
        Integer polePositions,
        Integer fastestLaps,
        Integer totalWins,
        Integer totalPodiums,
        String country,
        String logoUrl,
        String description,
        String imageFilename,
        TeamSeasonStat teamSeasonStat
) {}


