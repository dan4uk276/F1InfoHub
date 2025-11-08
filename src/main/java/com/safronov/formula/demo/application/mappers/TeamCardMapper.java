package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.dto.TeamCard;
import com.safronov.formula.demo.domain.entity.Team;

public interface TeamCardMapper {
    TeamCard mapToDTO(Team team, DriverCard driver1, DriverCard driver2);
}
