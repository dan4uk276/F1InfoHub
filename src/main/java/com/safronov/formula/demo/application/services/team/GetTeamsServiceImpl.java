package com.safronov.formula.demo.application.services.team;

import com.safronov.formula.demo.application.mappers.TeamMapper;
import com.safronov.formula.demo.domain.DTO.TeamCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.entity.Team;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamsService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import com.safronov.formula.demo.infrastructure.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class GetTeamsServiceImpl implements GetTeamsService {

    private final TeamRepository teamRepository;
    private final DriverRepository driverRepository;
    private final TeamMapper teamMapper;

    public GetTeamsServiceImpl(TeamRepository teamRepository, DriverRepository driverRepository, TeamMapper teamMapper) {
        this.teamRepository = teamRepository;
        this.driverRepository = driverRepository;
        this.teamMapper = teamMapper;
    }

    @Override
    public List<TeamCardDto> get() {
        return teamRepository.findAll().stream().map(this::mapToTeamCardDto).collect(toList());
    }

    private TeamCardDto mapToTeamCardDto(Team team) {
        List<Driver> drivers = driverRepository.findByTeamNameContaining(team.getName());
        return teamMapper.mapToDTO(team, drivers.get(0), drivers.get(1));
    }
}
