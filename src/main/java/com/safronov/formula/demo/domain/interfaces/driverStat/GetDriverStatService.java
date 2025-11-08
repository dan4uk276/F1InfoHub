package com.safronov.formula.demo.domain.interfaces.driverStat;

import com.safronov.formula.demo.domain.dto.DriverSeasonStat;

import java.util.Optional;

public interface GetDriverStatService{
    Optional<DriverSeasonStat> getById(Integer id);
}
