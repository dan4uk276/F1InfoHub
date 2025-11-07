package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverProfileDto;
import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.entity.Driver;

public interface DriverProfileMapper {
    DriverProfileDto mapToDTO(Driver driver, DriverSeasonStatsDto driverSeasonStatsDto);
}
