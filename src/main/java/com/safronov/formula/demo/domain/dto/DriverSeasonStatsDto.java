package com.safronov.formula.demo.domain.dto;

public record DriverSeasonStatsDto(
        Long seasonPosition,
        Long seasonPoints,
        Long gpPoints,
        Long gpRaces,
        Long gpWins,
        Long gpPodiums,
        Long gpPoles,
        Long gpTop10s,
        Long dhlFastestLaps,
        Long dnfs,
        Long sprintRaces,
        Long sprintPoints,
        Long sprintWins,
        Long sprintPodiums,
        Long sprintPoles,
        Long sprintTop10s
) {}
