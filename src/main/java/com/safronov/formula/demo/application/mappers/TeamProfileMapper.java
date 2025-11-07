package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.dto.TeamProfileDto;
import com.safronov.formula.demo.domain.entity.Team;

import java.util.List;

public interface TeamProfileMapper {
    TeamProfileDto mapToDTO(Team team, List<DriverCardDto> drivers);
}
