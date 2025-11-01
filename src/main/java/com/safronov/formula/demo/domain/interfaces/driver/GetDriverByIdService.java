package com.safronov.formula.demo.domain.interfaces.driver;



import com.safronov.formula.demo.domain.entity.Driver;

import java.util.Optional;

public interface GetDriverByIdService {
    Optional<Driver> getDriverById(Integer id);
}
