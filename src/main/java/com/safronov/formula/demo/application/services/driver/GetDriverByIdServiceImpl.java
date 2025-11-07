package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.application.mappers.DriverProfileMapper;
import com.safronov.formula.demo.domain.dto.DriverProfileDto;
import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.interfaces.driver.GetDriverByIdService;
import com.safronov.formula.demo.domain.interfaces.driverStats.GetDriverStatService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetDriverByIdServiceImpl implements GetDriverByIdService {

    private final DriverRepository driverRepository;
    private final GetDriverStatService getDriverStatService;
    private final DriverProfileMapper driverProfileMapper;

    public GetDriverByIdServiceImpl(DriverRepository driverRepository, GetDriverStatService getDriverStatService, DriverProfileMapper driverProfileMapper) {
        this.driverRepository = driverRepository;
        this.getDriverStatService = getDriverStatService;
        this.driverProfileMapper = driverProfileMapper;
    }

    @Override
    public Optional<DriverProfileDto> getDriverById(Integer id) {
        return driverRepository.findById(id)
                .stream()
                .map(driver -> {
                    DriverSeasonStatsDto driverSeasonStatsDto = getDriverStatService.getById(id)
                            .orElseThrow(() -> new EntityNotFoundException("User not found"));
                    return driverProfileMapper.mapToDTO(driver, driverSeasonStatsDto);
                }).findFirst();
    }
}
