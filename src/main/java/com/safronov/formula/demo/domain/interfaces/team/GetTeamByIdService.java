package com.safronov.formula.demo.domain.interfaces.team;

import com.safronov.formula.demo.domain.dto.TeamProfile;

import java.util.Optional;

public interface GetTeamByIdService{
    Optional<TeamProfile> getTeamById(int id);
}
