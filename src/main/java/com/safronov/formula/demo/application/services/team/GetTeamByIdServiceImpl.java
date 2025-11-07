package com.safronov.formula.demo.application.services.team;

import com.safronov.formula.demo.application.mappers.DriverCardMapper;
import com.safronov.formula.demo.application.mappers.TeamProfileMapper;
import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.dto.TeamProfileDto;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamByIdService;
import com.safronov.formula.demo.infrastructure.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GetTeamByIdServiceImpl implements GetTeamByIdService {
    private final TeamRepository teamRepository;
    private final DriverCardMapper driverCardMapper;
    private final TeamProfileMapper teamProfileMapper;

    public GetTeamByIdServiceImpl(TeamRepository teamRepository, DriverCardMapper driverCardMapper, TeamProfileMapper teamProfileMapper) {
        this.teamRepository = teamRepository;
        this.driverCardMapper = driverCardMapper;
        this.teamProfileMapper = teamProfileMapper;
    }

    @Override
    public Optional<TeamProfileDto> getTeamById(int id) {
        return teamRepository.findById(id)
                .map(team -> {
                    List<DriverCardDto> drivers = team.getDrivers()
                                   .stream()
                                   .map(driverCardMapper::mapToDTO)
                                   .toList();
            return teamProfileMapper.mapToDTO(team, drivers);
        });
    }
}
