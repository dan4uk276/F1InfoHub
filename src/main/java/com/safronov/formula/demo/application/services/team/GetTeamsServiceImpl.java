package com.safronov.formula.demo.application.services.team;

import com.safronov.formula.demo.domain.entity.Team;
import com.safronov.formula.demo.domain.interfaces.GetTeamsService;
import com.safronov.formula.demo.infrastructure.repositories.TeamRepository;
import org.springframework.cglib.core.internal.Function;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTeamsServiceImpl implements GetTeamsService {

    private final TeamRepository teamRepository;

    public GetTeamsServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public List<Team> get() {
        return teamRepository.findAll();
    }
}
