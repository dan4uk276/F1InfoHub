package com.safronov.formula.demo.application.services.team;

import com.safronov.formula.demo.application.mappers.DriverCardMapper;
import com.safronov.formula.demo.application.mappers.TeamProfileMapper;
import com.safronov.formula.demo.application.mappers.TeamSeasonStatMapper;
import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.dto.TeamProfile;
import com.safronov.formula.demo.domain.dto.TeamSeasonStat;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamByIdService;
import com.safronov.formula.demo.domain.interfaces.teamStat.GetTeamStatService;
import com.safronov.formula.demo.infrastructure.repositories.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GetTeamByIdServiceImpl implements GetTeamByIdService {
    private final TeamRepository teamRepository;
    private final GetTeamStatService getTeamStatService;
    private final DriverCardMapper driverCardMapper;
    private final TeamProfileMapper teamProfileMapper;
    private final TeamSeasonStatMapper teamSeasonStatMapper;

    public GetTeamByIdServiceImpl(TeamRepository teamRepository, GetTeamStatService getTeamStatService, DriverCardMapper driverCardMapper, TeamProfileMapper teamProfileMapper, TeamSeasonStatMapper teamSeasonStatMapper) {
        this.teamRepository = teamRepository;
        this.getTeamStatService = getTeamStatService;
        this.driverCardMapper = driverCardMapper;
        this.teamProfileMapper = teamProfileMapper;
        this.teamSeasonStatMapper = teamSeasonStatMapper;
    }

    @Override
    public Optional<TeamProfile> getTeamById(int id) {
        return teamRepository.findById(id)
                .map(team -> {
                    List<DriverCard> drivers = team.getDrivers()
                                   .stream()
                                   .map(driverCardMapper::mapToDTO)
                                   .toList();
                    TeamSeasonStat teamSeasonStat = getTeamStatService.getById(id)
                            .orElseThrow(() -> new EntityNotFoundException("Team stat not found"));;

            return teamProfileMapper.mapToDTO(team, drivers, teamSeasonStat);
        });
    }
}
