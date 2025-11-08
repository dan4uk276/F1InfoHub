package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.entity.DriverStat;

public interface DriverSeasonStatMapper {
    DriverSeasonStat mapToDTO(DriverStat driverStat);
}
