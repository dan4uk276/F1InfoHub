package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.dto.TeamProfile;
import com.safronov.formula.demo.domain.dto.TeamSeasonStat;
import com.safronov.formula.demo.domain.entity.Team;

import java.util.List;

public interface TeamProfileMapper {
    TeamProfile mapToDTO(Team team, List<DriverCard> drivers, TeamSeasonStat teamSeasonStat);
}
