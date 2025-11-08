package com.safronov.formula.demo.application.services.driverStat;

import com.safronov.formula.demo.application.mappers.DriverSeasonStatMapper;
import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.interfaces.driverStat.GetDriverStatsService;
import com.safronov.formula.demo.infrastructure.repositories.DriverStatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriverStatsServiceImpl implements GetDriverStatsService {

    private final DriverStatRepository driverStatRepository;
    private final DriverSeasonStatMapper driverSeasonStatMapper;

    public GetDriverStatsServiceImpl(DriverStatRepository driverStatRepository, DriverSeasonStatMapper driverSeasonStatMapper) {
        this.driverStatRepository = driverStatRepository;
        this.driverSeasonStatMapper = driverSeasonStatMapper;
    }

    @Override
    public List<DriverSeasonStat> get() {
        return driverStatRepository.findAll().stream().map(driverSeasonStatMapper::mapToDTO).toList();
    }
}
