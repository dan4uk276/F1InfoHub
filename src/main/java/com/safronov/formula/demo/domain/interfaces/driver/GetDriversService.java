package com.safronov.formula.demo.domain.interfaces.driver;

import com.safronov.formula.demo.domain.DTO.DriverCardDto;

import java.util.List;
import java.util.function.Supplier;

public interface GetDriversService extends Supplier<List<DriverCardDto>> {
}
