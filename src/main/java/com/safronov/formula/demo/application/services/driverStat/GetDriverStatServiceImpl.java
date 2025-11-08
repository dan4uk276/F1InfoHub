package com.safronov.formula.demo.application.services.driverStat;

import com.safronov.formula.demo.application.mappers.DriverSeasonStatMapper;
import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.interfaces.driverStat.GetDriverStatService;
import com.safronov.formula.demo.infrastructure.repositories.DriverStatRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetDriverStatServiceImpl implements GetDriverStatService {

    private final DriverStatRepository driverStatRepository;
    private final DriverSeasonStatMapper driverSeasonStatMapper;

    public GetDriverStatServiceImpl(DriverStatRepository driverStatRepository, DriverSeasonStatMapper driverSeasonStatMapper) {
        this.driverStatRepository = driverStatRepository;
        this.driverSeasonStatMapper = driverSeasonStatMapper;
    }

    @Override
    public Optional<DriverSeasonStat> getById(Integer id) {
        return driverStatRepository.findById(id).map(driverSeasonStatMapper::mapToDTO);
    }
}
