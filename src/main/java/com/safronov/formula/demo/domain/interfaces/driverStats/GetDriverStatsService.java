package com.safronov.formula.demo.domain.interfaces.driverStats;

import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;

import java.util.List;
import java.util.function.Supplier;

public interface GetDriverStatsService extends Supplier<List<DriverSeasonStatsDto>> {
}
