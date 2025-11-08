package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.dto.DriverCard;
import com.safronov.formula.demo.domain.dto.TeamCard;
import com.safronov.formula.demo.domain.entity.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamCardMapperImpl implements TeamCardMapper {

    @Override
    public TeamCard mapToDTO(Team team, DriverCard driver1, DriverCard driver2) {
        return new TeamCard(
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
