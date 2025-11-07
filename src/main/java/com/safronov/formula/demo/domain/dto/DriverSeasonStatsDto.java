package com.safronov.formula.demo.domain.dto;

public record DriverSeasonStatsDto(
        String driverName,
        Long seasonPosition,
        Long seasonPoints,
        Long gpRaces,
        Long gpWins,
        Long gpPodiums,
        Long gpPoles,
        Long gpTop10s,
        Long dhlFastestLaps,
        Long dnfs
) {}
