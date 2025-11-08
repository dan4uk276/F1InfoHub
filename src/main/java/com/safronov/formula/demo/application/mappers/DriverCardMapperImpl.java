package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.stereotype.Component;

@Component
public class DriverCardMapperImpl implements DriverCardMapper {
    @Override
    public DriverCard mapToDTO(Driver driver) {
        return new DriverCard(
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
