package com.safronov.formula.demo.domain.interfaces.teamStat;

import com.safronov.formula.demo.domain.dto.TeamSeasonStat;

import java.util.Optional;

public interface GetTeamStatService {
    Optional<TeamSeasonStat> getById(Integer id);
}
