package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.DTO.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverMapperImpl implements DriverMapper {
    @Override
    public DriverCardDto mapToDTO(Driver driver) {
        DriverCardDto driverCardDto = new DriverCardDto();
        driverCardDto.setId(driver.getId());
        driverCardDto.setName(driver.getName());
        driverCardDto.setTeamName(driver.getTeamName());
        driverCardDto.setCountry(driver.getCountry());
        driverCardDto.setPodiums(driver.getPodiums());
        driverCardDto.setPoints(driver.getPoints());
        driverCardDto.setNumber(driver.getNumber());
        driverCardDto.setImageFilename(driver.getImageFilename());
        return driverCardDto;
    }
}
