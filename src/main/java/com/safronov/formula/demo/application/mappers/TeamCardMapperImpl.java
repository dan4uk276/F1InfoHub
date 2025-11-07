package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCardDto;
import com.safronov.formula.demo.domain.dto.TeamCardDto;
import com.safronov.formula.demo.domain.entity.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamCardMapperImpl implements TeamCardMapper {

    @Override
    public TeamCardDto mapToDTO(Team team, DriverCardDto driver1, DriverCardDto driver2) {
        return new TeamCardDto(
                    team.getId(),
                    team.getName(),
                    team.getFullName(),
                    driver1.name(),
                    driver2.name(),
                    driver1.imageFilename(),
                    driver2.imageFilename(),
                    team.getImageFilename(),
                    team.getLogoUrl()
       );
    }
}
