package com.safronov.formula.demo.domain.interfaces.driverStat;

import com.safronov.formula.demo.domain.dto.DriverSeasonStat;

import java.util.List;
import java.util.function.Supplier;

public interface GetDriverStatsService extends Supplier<List<DriverSeasonStat>> {
}
