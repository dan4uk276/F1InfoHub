package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversByNumberService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversByNumberServiceImpl implements GetDriversByNumberService {

    private final DriverRepository driverRepository;

    public GetDriversByNumberServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> apply(Integer number) {
        return driverRepository.findByNumber(number);
    }
}
