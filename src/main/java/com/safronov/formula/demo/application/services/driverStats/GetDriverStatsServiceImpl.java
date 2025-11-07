package com.safronov.formula.demo.application.services.driverStats;

import com.safronov.formula.demo.application.mappers.DriverStatsMapper;
import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.interfaces.driverStats.GetDriverStatsService;
import com.safronov.formula.demo.infrastructure.repositories.DriverStatsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriverStatsServiceImpl implements GetDriverStatsService {

    private final DriverStatsRepository driverStatsRepository;
    private final DriverStatsMapper driverStatsMapper;

    public GetDriverStatsServiceImpl(DriverStatsRepository driverStatsRepository, DriverStatsMapper driverStatsMapper) {
        this.driverStatsRepository = driverStatsRepository;
        this.driverStatsMapper = driverStatsMapper;
    }

    @Override
    public List<DriverSeasonStatsDto> get() {
        return driverStatsRepository.findAll().stream().map(driverStatsMapper::mapToDTO).toList();
    }
}
