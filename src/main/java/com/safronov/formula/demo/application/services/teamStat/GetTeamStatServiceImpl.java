package com.safronov.formula.demo.application.services.teamStat;

import com.safronov.formula.demo.application.mappers.TeamSeasonStatMapper;
import com.safronov.formula.demo.domain.dto.TeamSeasonStat;
import com.safronov.formula.demo.domain.interfaces.teamStat.GetTeamStatService;
import com.safronov.formula.demo.infrastructure.repositories.TeamStatRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetTeamStatServiceImpl implements GetTeamStatService {

    private final TeamStatRepository teamStatRepository;
    private final TeamSeasonStatMapper teamSeasonStatMapper;

    public GetTeamStatServiceImpl(TeamStatRepository teamStatRepository, TeamSeasonStatMapper teamSeasonStatMapper) {
        this.teamStatRepository = teamStatRepository;
        this.teamSeasonStatMapper = teamSeasonStatMapper;
    }

    @Override
    public Optional<TeamSeasonStat> getById(Integer id) {
        return teamStatRepository.findById(id).map(teamSeasonStatMapper::mapToDto);
    }
}
