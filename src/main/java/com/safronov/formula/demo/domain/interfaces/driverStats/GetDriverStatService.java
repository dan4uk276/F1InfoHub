package com.safronov.formula.demo.domain.interfaces.driverStats;

import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;

import java.util.Optional;

public interface GetDriverStatService{
    Optional<DriverSeasonStatsDto> getById(Integer id);
}
