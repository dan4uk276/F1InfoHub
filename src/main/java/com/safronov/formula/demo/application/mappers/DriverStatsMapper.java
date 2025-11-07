package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.entity.DriverStats;

public interface DriverStatsMapper {
    DriverSeasonStatsDto mapToDTO(DriverStats driverStats);
}
