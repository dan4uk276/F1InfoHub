package com.safronov.formula.demo.api.controllers;
import com.safronov.formula.demo.domain.DTO.DriverCardDto;
import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.interfaces.driver.*;
import org.springframework.http.ResponseEntity;
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
    private final GetDriverByIdService getDriverByIdService;


    public DriverController(GetDriversService getDriversService,
                            GetDriversByNameService getDriversByNameService,
                            GetDriversByNumberService getDriversByNumberService,
                            GetDriversByTeamService getDriversByTeamService,
                            GetDriversByCountryService getDriversByCountryService, GetDriverByIdService getDriverByIdService) {
        this.getDriversService = getDriversService;
        this.getDriversByNameService = getDriversByNameService;
        this.getDriversByNumberService = getDriversByNumberService;
        this.getDriversByTeamService = getDriversByTeamService;
        this.getDriversByCountryService = getDriversByCountryService;
        this.getDriverByIdService = getDriverByIdService;
    }

    @GetMapping("/drivers/{id}")
    public @ResponseBody ResponseEntity<Driver> getDriverById(@PathVariable  Integer id) {
         return getDriverByIdService.getDriverById(id)
                         .map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/drivers")
    public @ResponseBody List<DriverCardDto> getDrivers() {

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
