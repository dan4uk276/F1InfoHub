package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.entity.DriverStats;
import org.springframework.stereotype.Component;

@Component
public class DriverStatsMapperImpl implements DriverStatsMapper {
    @Override
    public DriverSeasonStatsDto mapToDTO(DriverStats driverStats) {
        return new DriverSeasonStatsDto(
                driverStats.getWdcPosition(),
                driverStats.getSeasonPoints(),
                driverStats.getGrandPrixPoints(),
                driverStats.getGrandPrixRaces(),
                driverStats.getGrandPrixWins(),
                driverStats.getGrandPrixPodiums(),
                driverStats.getGrandPrixPoles(),
                driverStats.getGrandPrixTop10s(),
                driverStats.getDhlFastestLaps(),
                driverStats.getDnfs(),
                driverStats.getSprintRaces(),
                driverStats.getSprintPoints(),
                driverStats.getSprintWins(),
                driverStats.getSprintPodiums(),
                driverStats.getSprintPoles(),
                driverStats.getSprintTop10s()
        );
    }
}
