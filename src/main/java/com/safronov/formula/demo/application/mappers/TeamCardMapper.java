package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.dto.TeamCardDto;
import com.safronov.formula.demo.domain.entity.Team;

public interface TeamCardMapper {
    TeamCardDto mapToDTO(Team team, DriverCardDto driver1, DriverCardDto driver2);
}
