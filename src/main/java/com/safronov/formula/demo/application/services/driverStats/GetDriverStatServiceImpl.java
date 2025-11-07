package com.safronov.formula.demo.application.services.driverStats;

import com.safronov.formula.demo.application.mappers.DriverStatsMapper;
import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.interfaces.driverStats.GetDriverStatService;
import com.safronov.formula.demo.infrastructure.repositories.DriverStatsRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetDriverStatServiceImpl implements GetDriverStatService {

    private final DriverStatsRepository driverStatsRepository;
    private final DriverStatsMapper driverStatsMapper;

    public GetDriverStatServiceImpl(DriverStatsRepository driverStatsRepository, DriverStatsMapper driverStatsMapper) {
        this.driverStatsRepository = driverStatsRepository;
        this.driverStatsMapper = driverStatsMapper;
    }

    @Override
    public Optional<DriverSeasonStatsDto> getById(Integer id) {
        return driverStatsRepository.findById(id).stream().map(driverStatsMapper::mapToDTO).findFirst();
    }
}
