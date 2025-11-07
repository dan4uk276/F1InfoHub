package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverProfileDto;
import com.safronov.formula.demo.domain.dto.DriverSeasonStatsDto;
import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverProfileMapperImpl implements DriverProfileMapper {
    @Override
    public DriverProfileDto mapToDTO(Driver driver, DriverSeasonStatsDto driverSeasonStatsDto) {
        return new  DriverProfileDto (
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
                driverSeasonStatsDto
        );
    }
}
