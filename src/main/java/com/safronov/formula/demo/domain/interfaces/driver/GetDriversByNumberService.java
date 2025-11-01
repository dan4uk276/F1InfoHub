package com.safronov.formula.demo.domain.interfaces.driver;

import com.safronov.formula.demo.domain.entity.Driver;

import java.util.List;
import java.util.function.Function;

public interface GetDriversByNumberService extends Function<Integer, List<Driver>> {
}
