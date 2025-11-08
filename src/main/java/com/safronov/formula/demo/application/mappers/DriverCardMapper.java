package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.entity.Driver;

public interface DriverCardMapper {
    DriverCard mapToDTO(Driver driver);
}
