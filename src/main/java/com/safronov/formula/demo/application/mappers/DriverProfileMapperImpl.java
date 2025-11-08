package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverProfile;
import com.safronov.formula.demo.domain.dto.DriverSeasonStat;
import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverProfileMapperImpl implements DriverProfileMapper {
    @Override
    public DriverProfile mapToDTO(Driver driver, DriverSeasonStat driverSeasonStat) {
        return new DriverProfile(
                driver.getName(),
                driver.getNumber(),
                driver.getTeamName(),
                driver.getCountry(),
                driver.getPodiums(),
                driver.getPoints(),
                driver.getImageFilename(),
                driver.getGpEntered(),
                driver.getWdc(),
                driver.getHighestRaceFinish(),
                driver.getHighestGridPosition(),
                driver.getDateOfBirth(),
                driver.getPlaceOfBirth(),
                driver.getBiography(),
                driver.getQuote(),
                driverSeasonStat
        );
    }
}
