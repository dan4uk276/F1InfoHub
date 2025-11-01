package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.DTO.TeamCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.entity.Team;

public interface TeamMapper {
    TeamCardDto mapToDTO(Team team, Driver driver1, Driver driver2);
}
