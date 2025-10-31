package com.safronov.formula.demo.domain.interfaces;



import com.safronov.formula.demo.domain.entity.Driver;

import java.util.Optional;
import java.util.function.Supplier;

public interface GetDriverByIdService {
    Optional<Driver> getDriverById(Integer id);
}
