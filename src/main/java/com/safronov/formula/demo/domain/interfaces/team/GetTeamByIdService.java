package com.safronov.formula.demo.domain.interfaces.team;

import com.safronov.formula.demo.domain.dto.TeamProfileDto;

import java.util.Optional;

public interface GetTeamByIdService{
    Optional<TeamProfileDto> getTeamById(int id);
}
