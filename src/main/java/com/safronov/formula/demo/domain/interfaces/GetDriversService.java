package com.safronov.formula.demo.domain.interfaces;

import com.safronov.formula.demo.domain.entity.Driver;
import java.util.List;
import java.util.function.Supplier;

public interface GetDriversService extends Supplier<List<Driver>> {
}
