package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;

public interface DriverCardMapper {
    DriverCardDto mapToDTO(Driver driver);
}
