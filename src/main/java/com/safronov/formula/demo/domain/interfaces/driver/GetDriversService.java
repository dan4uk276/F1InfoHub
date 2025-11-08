package com.safronov.formula.demo.domain.interfaces.driver;

import com.safronov.formula.demo.domain.dto.DriverCard;

import java.util.List;
import java.util.function.Supplier;

public interface GetDriversService extends Supplier<List<DriverCard>> {
}
