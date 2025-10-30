package com.safronov.formula.demo.application.services.driver;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.GetDriversByTeamService;
import com.safronov.formula.demo.infrastructure.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDriversByTeamServiceImpl implements GetDriversByTeamService {

    private final DriverRepository driverRepository;

    public GetDriversByTeamServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> apply(String team) {
        return driverRepository.findByTeamNameContaining(team);
    }
}
