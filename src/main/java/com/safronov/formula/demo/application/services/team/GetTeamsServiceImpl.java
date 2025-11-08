package com.safronov.formula.demo.application.services.team;

import com.safronov.formula.demo.application.mappers.DriverCardMapper;
import com.safronov.formula.demo.application.mappers.TeamCardMapper;
import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.dto.TeamCard;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.entity.Team;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamsService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import com.safronov.formula.demo.infrastructure.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTeamsServiceImpl implements GetTeamsService {

    private final TeamRepository teamRepository;
    private final DriverRepository driverRepository;
    private final TeamCardMapper teamCardMapper;
    private final DriverCardMapper driverCardMapper;

    public GetTeamsServiceImpl(TeamRepository teamRepository, DriverRepository driverRepository, TeamCardMapper teamCardMapper, DriverCardMapper driverCardMapper) {
        this.teamRepository = teamRepository;
        this.driverRepository = driverRepository;
        this.teamCardMapper = teamCardMapper;
        this.driverCardMapper = driverCardMapper;
    }

    @Override
    public List<TeamCard> get() {
        return teamRepository.findAll().stream().map(this::mapToTeamCardDto).toList();
    }

    private TeamCard mapToTeamCardDto(Team team) {
        List<Driver> drivers = driverRepository.findByTeamNameContainingIgnoreCase(team.getName());
        DriverCard driver1 = driverCardMapper.mapToDTO(drivers.get(0));
        DriverCard driver2 = driverCardMapper.mapToDTO(drivers.get(1));
        return teamCardMapper.mapToDTO(team, driver1, driver2);
    }
}
