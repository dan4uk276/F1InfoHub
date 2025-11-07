package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.dto.TeamProfileDto;
import com.safronov.formula.demo.domain.entity.Team;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamProfileMapperImpl implements TeamProfileMapper {
    @Override
    public TeamProfileDto mapToDTO(Team team, List<DriverCardDto> drivers) {
        return new TeamProfileDto(
                team.getName(),
                team.getFullName(),
                drivers,
                team.getBase(),
                team.getTeamChief(),
                team.getTechnicalChief(),
                team.getChassis(),
                team.getPowerUnit(),
                team.getFirstTeamEntry(),
                team.getWorldChampionships(),
                team.getHighestRaceFinish(),
                team.getPolePositions(),
                team.getFastestLaps(),
                team.getTotalWins(),
                team.getTotalPodiums(),
                team.getCountry(),
                team.getLogoUrl(),
                team.getDescription(),
                team.getImageFilename()
        );
    }
}
