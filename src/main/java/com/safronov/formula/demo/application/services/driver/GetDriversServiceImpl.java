package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversServiceImpl implements GetDriversService {
    private final DriverRepository driverRepository;

    public GetDriversServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> get() {
        return driverRepository.findAll();
    }
}
