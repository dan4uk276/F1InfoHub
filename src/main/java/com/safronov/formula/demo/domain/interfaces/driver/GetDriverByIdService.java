package com.safronov.formula.demo.domain.interfaces.driver;

import com.safronov.formula.demo.domain.dto.DriverProfile;

import java.util.Optional;

public interface GetDriverByIdService {
    Optional<DriverProfile> getDriverById(Integer id);
}
