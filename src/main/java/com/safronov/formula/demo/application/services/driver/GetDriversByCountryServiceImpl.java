package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversByCountryService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversByCountryServiceImpl implements GetDriversByCountryService {

    private final DriverRepository driverRepository;

    public GetDriversByCountryServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> apply(String country) {
        return driverRepository.findByCountryContainingIgnoreCase(country);
    }
}
