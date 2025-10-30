package com.safronov.formula.demo.api.controllers;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "*")
public class DriverController {

    private final GetDriversService getDriversService;
    private final GetDriversByNameService getDriversByNameService;
    private final GetDriversByNumberService getDriversByNumberService;
    private final GetDriversByTeamService getDriversByTeamService;
    private final GetDriversByCountryService getDriversByCountryService;

    public DriverController(GetDriversService getDriversService, GetDriversByNameService getDriversByNameService, GetDriversByNumberService getDriversByNumberService, GetDriversByTeamService getDriversByTeamService, GetDriversByCountryService getDriversByCountryService) {
        this.getDriversService = getDriversService;
        this.getDriversByNameService = getDriversByNameService;
        this.getDriversByNumberService = getDriversByNumberService;
        this.getDriversByTeamService = getDriversByTeamService;
        this.getDriversByCountryService = getDriversByCountryService;
    }

    @GetMapping("/drivers")
    public @ResponseBody List<Driver> getDrivers() {

        return getDriversService.get();
    }

    @GetMapping("/drivers/by-name")
    public @ResponseBody List<Driver> getDriversByName(@RequestParam String name) {

        return getDriversByNameService.apply(name);
    }

    @GetMapping("/drivers/by-number")
    public @ResponseBody List<Driver> getDriversByNumber(@RequestParam Integer number) {

        return getDriversByNumberService.apply(number);
    }

    @GetMapping("/drivers/by-team")
    public @ResponseBody List<Driver> getDriversByTeam(@RequestParam String team) {

        return getDriversByTeamService.apply(team);
    }

    @GetMapping("/drivers/by-country")
    public @ResponseBody List<Driver> getDriversByCountry(@RequestParam String country) {

        return getDriversByCountryService.apply(country);
    }

}
