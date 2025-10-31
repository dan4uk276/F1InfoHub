package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.DTO.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;

public interface DriverMapper {
    DriverCardDto mapToDTO(Driver driver);
}
