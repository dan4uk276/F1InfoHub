package com.safronov.formula.demo.domain.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "driver_stats_2025")
public class DriverStat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "season_points")
    private Long seasonPoints;

    @Column(name = "wdc_position")
    private Long wdcPosition;

    @Column(name = "grand_prix_races")
    private Long grandPrixRaces;

    @Column(name = "grand_prix_points")
    private Long grandPrixPoints;

    @Column(name = "grand_prix_wins")
    private Long grandPrixWins;

    @Column(name = "grand_prix_podiums")
    private Long grandPrixPodiums;

    @Column(name = "grand_prix_poles")
    private Long grandPrixPoles;

    @Column(name = "grand_prix_top_10s")
    private Long grandPrixTop10s;

    @Column(name = "fastest_laps")
    private Long dhlFastestLaps;

    @Column(name = "dnfs")
    private Long dnfs;

    @Column(name = "sprint_races")
    private Long sprintRaces;

    @Column(name = "sprint_points")
    private Long sprintPoints;

    @Column(name = "sprint_wins")
    private Long sprintWins;

    @Column(name = "sprint_podiums")
    private Long sprintPodiums;

    @Column(name = "sprint_poles")
    private Long sprintPoles;

    @Column(name = "sprint_top_10s")
    private Long sprintTop10s;

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public Long getWdcPosition() {
        return wdcPosition;
    }

    public void setWdcPosition(Long wdcPosition) {
        this.wdcPosition = wdcPosition;
    }

    public Long getSeasonPoints() {
        return seasonPoints;
    }

    public void setSeasonPoints(Long seasonPoints) {
        this.seasonPoints = seasonPoints;
    }

    public Long getGrandPrixRaces() {
        return grandPrixRaces;
    }

    public void setGrandPrixRaces(Long grandPrixRaces) {
        this.grandPrixRaces = grandPrixRaces;
    }

    public Long getGrandPrixPoints() {
        return grandPrixPoints;
    }

    public void setGrandPrixPoints(Long grandPrixPoints) {
        this.grandPrixPoints = grandPrixPoints;
    }

    public Long getGrandPrixWins() {
        return grandPrixWins;
    }

    public void setGrandPrixWins(Long grandPrixWins) {
        this.grandPrixWins = grandPrixWins;
    }

    public Long getGrandPrixPodiums() {
        return grandPrixPodiums;
    }

    public void setGrandPrixPodiums(Long grandPrixPodiums) {
        this.grandPrixPodiums = grandPrixPodiums;
    }

    public Long getGrandPrixPoles() {
        return grandPrixPoles;
    }

    public void setGrandPrixPoles(Long grandPrixPoles) {
        this.grandPrixPoles = grandPrixPoles;
    }

    public Long getGrandPrixTop10s() {
        return grandPrixTop10s;
    }

    public void setGrandPrixTop10s(Long grandPrixTop10s) {
        this.grandPrixTop10s = grandPrixTop10s;
    }

    public Long getDhlFastestLaps() {
        return dhlFastestLaps;
    }

    public void setDhlFastestLaps(Long dhlFastestLaps) {
        this.dhlFastestLaps = dhlFastestLaps;
    }

    public Long getDnfs() {
        return dnfs;
    }

    public void setDnfs(Long dnfs) {
        this.dnfs = dnfs;
    }

    public Long getSprintRaces() {
        return sprintRaces;
    }

    public void setSprintRaces(Long sprintRaces) {
        this.sprintRaces = sprintRaces;
    }

    public Long getSprintPoints() {
        return sprintPoints;
    }

    public void setSprintPoints(Long sprintPoints) {
        this.sprintPoints = sprintPoints;
    }

    public Long getSprintWins() {
        return sprintWins;
    }

    public void setSprintWins(Long sprintWins) {
        this.sprintWins = sprintWins;
    }

    public Long getSprintPodiums() {
        return sprintPodiums;
    }

    public void setSprintPodiums(Long sprintPodiums) {
        this.sprintPodiums = sprintPodiums;
    }

    public Long getSprintPoles() {
        return sprintPoles;
    }

    public void setSprintPoles(Long sprintPoles) {
        this.sprintPoles = sprintPoles;
    }

    public Long getSprintTop10s() {
        return sprintTop10s;
    }

    public void setSprintTop10s(Long sprintTop10s) {
        this.sprintTop10s = sprintTop10s;
    }
}