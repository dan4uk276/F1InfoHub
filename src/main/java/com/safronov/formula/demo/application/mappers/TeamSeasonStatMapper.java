package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.TeamSeasonStat;
import com.safronov.formula.demo.domain.entity.TeamStat;

public interface TeamSeasonStatMapper {
    TeamSeasonStat mapToDto(TeamStat teamStat);
}
