package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.application.mappers.DriverMapper;
import com.safronov.formula.demo.domain.DTO.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class GetDriversServiceImpl implements GetDriversService {
    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;

    public GetDriversServiceImpl(DriverRepository driverRepository, DriverMapper driverMapper) {
        this.driverRepository = driverRepository;
        this.driverMapper = driverMapper;
    }

    @Override
    public List<DriverCardDto> get() {
        return driverRepository.findAll().stream().map(driverMapper::mapToDTO).collect(toList());
    }
}
