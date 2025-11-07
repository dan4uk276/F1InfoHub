package com.safronov.formula.demo.domain.interfaces.driver;

import com.safronov.formula.demo.domain.dto.DriverProfileDto;

import java.util.Optional;

public interface GetDriverByIdService {
    Optional<DriverProfileDto> getDriverById(Integer id);
}
