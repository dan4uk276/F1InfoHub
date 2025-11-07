package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverCardMapperImpl implements DriverCardMapper {
    @Override
    public DriverCardDto mapToDTO(Driver driver) {
        return new DriverCardDto(
                driver.getId(),
                driver.getName(),
                driver.getNumber(),
                driver.getTeamName(),
                driver.getCountry(),
                driver.getPodiums(),
                driver.getPoints(),
                driver.getImageFilename()
        );
    }
}
