package com.safronov.formula.demo.domain.interfaces;

import com.safronov.formula.demo.domain.entity.Driver;

import java.util.List;
import java.util.function.Function;

public interface GetDriversByNameService extends Function<String, List<Driver>>{

}
