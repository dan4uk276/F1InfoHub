package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.entity.DriverStat;
import org.springframework.stereotype.Component;

@Component
public class DriverSeasonStatMapperImpl implements DriverSeasonStatMapper {
    @Override
    public DriverSeasonStat mapToDTO(DriverStat driverStat) {
        return new DriverSeasonStat(
                driverStat.getWdcPosition(),
                driverStat.getSeasonPoints(),
                driverStat.getGrandPrixPoints(),
                driverStat.getGrandPrixRaces(),
                driverStat.getGrandPrixWins(),
                driverStat.getGrandPrixPodiums(),
                driverStat.getGrandPrixPoles(),
                driverStat.getGrandPrixTop10s(),
                driverStat.getDhlFastestLaps(),
                driverStat.getDnfs(),
                driverStat.getSprintRaces(),
                driverStat.getSprintPoints(),
                driverStat.getSprintWins(),
                driverStat.getSprintPodiums(),
                driverStat.getSprintPoles(),
                driverStat.getSprintTop10s()
        );
    }
}
