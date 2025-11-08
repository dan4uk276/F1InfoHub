package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverProfile;
import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.entity.Driver;

public interface DriverProfileMapper {
    DriverProfile mapToDTO(Driver driver, DriverSeasonStat driverSeasonStat);
}
