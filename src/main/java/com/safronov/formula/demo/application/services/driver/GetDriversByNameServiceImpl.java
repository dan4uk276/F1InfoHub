package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversByNameService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversByNameServiceImpl implements GetDriversByNameService {

    private final DriverRepository driverRepository;

    public GetDriversByNameServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> apply(String name) {
        return driverRepository.findByNameContainingIgnoreCase(name);
    }
}
