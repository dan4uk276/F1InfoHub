package com.safronov.formula.demo.api.controllers;

import com.safronov.formula.demo.domain.dto.TeamCard;
import com.safronov.formula.demo.domain.dto.TeamProfile;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamByIdService;
import com.safronov.formula.demo.domain.interfaces.team.GetTeamsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    private final GetTeamsService getTeamsService;
    private final GetTeamByIdService getTeamByIdService;

    public TeamController(GetTeamsService getTeamsService, GetTeamByIdService getTeamByIdService) {
        this.getTeamsService = getTeamsService;
        this.getTeamByIdService = getTeamByIdService;
    }

    @GetMapping
    public @ResponseBody List<TeamCard> getTeams() {
        return getTeamsService.get();
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<TeamProfile> getTeams(@PathVariable Integer id) {
        return getTeamByIdService.getTeamById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

}
