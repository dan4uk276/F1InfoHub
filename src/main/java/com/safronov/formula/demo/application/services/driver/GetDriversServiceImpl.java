package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.application.mappers.DriverCardMapper;
import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.interfaces.driver.GetDriversService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversServiceImpl implements GetDriversService {
    private final DriverRepository driverRepository;
    private final DriverCardMapper driverCardMapper;

    public GetDriversServiceImpl(DriverRepository driverRepository, DriverCardMapper driverCardMapper) {
        this.driverRepository = driverRepository;
        this.driverCardMapper = driverCardMapper;
    }

    @Override
    public List<DriverCardDto> get() {
        return driverRepository.findAllDrivers().stream().map(driverCardMapper::mapToDTO).toList();
    }
}
