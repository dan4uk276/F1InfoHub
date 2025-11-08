package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.TeamSeasonStat;
import com.safronov.formula.demo.domain.entity.TeamStat;
import org.springframework.stereotype.Component;

@Component
public class TeamSeasonStatMapperImpl implements TeamSeasonStatMapper{
    @Override
    public TeamSeasonStat mapToDto(TeamStat teamStat) {
        return new TeamSeasonStat(
                teamStat.getWccPosition(),
                teamStat.getSeasonPoints(),
                teamStat.getGrandPrixRaces(),
                teamStat.getGrandPrixPoints(),
                teamStat.getGrandPrixWins(),
                teamStat.getGrandPrixPodiums(),
                teamStat.getGrandPrixPoles(),
                teamStat.getGrandPrixTop10s(),
                teamStat.getFastestLaps(),
                teamStat.getDnfs(),
                teamStat.getSprintRaces(),
                teamStat.getSprintPoints(),
                teamStat.getSprintWins(),
                teamStat.getSprintPodiums(),
                teamStat.getSprintPoles(),
                teamStat.getSprintTop10s()
        );
    }
}
