package com.safronov.formula.demo.application.mappers;

import com.safronov.formula.demo.domain.DTO.DriverCardDto;
import com.safronov.formula.demo.domain.DTO.TeamCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.entity.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamMapperImpl implements TeamMapper{

    @Override
    public TeamCardDto mapToDTO(Team team, Driver driver1, Driver driver2) {
        TeamCardDto result = new TeamCardDto();
        result.setId(team.getId());
        result.setName(team.getName());
        result.setFullName(team.getFullName());
        result.setCarImageFilename(team.getImageFilename());
        result.setDriver1Name(driver1.getName());
        result.setDriver2Name(driver2.getName());
        result.setDriver1ImageFilename(driver1.getImageFilename());
        result.setDriver2ImageFilename(driver2.getImageFilename());
        result.setLogoUrl(team.getLogoUrl());
        return result;
    }
}
