package com.safronov.formula.demo.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "driver")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String abbreviation;

    @Column
    private int number;

    @Column(name = "team_name")
    private String teamName;

    @Column
    private String country;

    @Column
    private int podiums;

    @Column
    private int points;

    @Column(name = "grands_prix_entered")
    private int gpEntered;

    @Column(name = "world_championships")
    private int wdc;

    @Column(name = "highest_race_finish")
    private String highestRaceFinish;

    @Column(name = "highest_grid_position")
    private String highestGridPosition;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "place_of_birth")
    private String placeOfBirth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    @JsonBackReference // Избегаем циклической сериализации
    private Team team;

    @Column(name = "image_filename", length = 100)
    private String imageFilename;

    @Column(name = "biography", columnDefinition = "TEXT")
    private String biography;

    @Column
    private String quote;

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getImageFilename() {
        return imageFilename;
    }

    public void setImageFilename(String imageFilename) {
        this.imageFilename = imageFilename;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getTeamName() {
        return teamName;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team_id) {
        this.team = team_id;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPodiums() {
        return podiums;
    }

    public void setPodiums(int podiums) {
        this.podiums = podiums;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getGpEntered() {
        return gpEntered;
    }

    public void setGpEntered(int gpEntered) {
        this.gpEntered = gpEntered;
    }

    public int getWdc() {
        return wdc;
    }

    public void setWdc(int wdc) {
        this.wdc = wdc;
    }

    public String getHighestRaceFinish() {
        return highestRaceFinish;
    }

    public void setHighestRaceFinish(String highestRaceFinish) {
        this.highestRaceFinish = highestRaceFinish;
    }

    public String getHighestGridPosition() {
        return highestGridPosition;
    }

    public void setHighestGridPosition(String highestGridPosition) {
        this.highestGridPosition = highestGridPosition;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

}
