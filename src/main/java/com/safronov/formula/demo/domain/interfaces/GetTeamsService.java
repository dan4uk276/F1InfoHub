package com.safronov.formula.demo.domain.interfaces;

import com.safronov.formula.demo.domain.entity.Team;

import java.util.List;
import java.util.function.Supplier;

public interface GetTeamsService extends Supplier<List<Team>> {
}
