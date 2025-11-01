package com.safronov.formula.demo.domain.interfaces.team;

import com.safronov.formula.demo.domain.DTO.TeamCardDto;

import java.util.List;
import java.util.function.Supplier;

public interface GetTeamsService extends Supplier<List<TeamCardDto>> {
}
