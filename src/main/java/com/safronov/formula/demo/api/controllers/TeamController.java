package com.safronov.formula.demo.api.controllers;

import com.safronov.formula.demo.domain.DTO.TeamCardDto;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "*")
public class TeamController {

    private final GetTeamsService getTeamsService;

    public TeamController(GetTeamsService getTeamsService) {
        this.getTeamsService = getTeamsService;
    }

    @GetMapping("/teams")
    public @ResponseBody List<TeamCardDto> getTeams() {
        return getTeamsService.get();
    }
}
