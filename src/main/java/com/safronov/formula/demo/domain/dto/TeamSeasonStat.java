package com.safronov.formula.demo.domain.dto;

public record TeamSeasonStat(
    Long seasonPosition,
    Long seasonPoints,
    Long gpRaces,
    Long gpPoints,
    Long gpWins,
    Long gpPodiums,
    Long gpPoles,
    Long gpTop10s,
    Long fastestLaps,
    Long dnfs,
    Long sprintRaces,
    Long sprintPoints,
    Long sprintWins,
    Long sprintPodiums,
    Long sprintPoles,
    Long sprintTop10s
){}
