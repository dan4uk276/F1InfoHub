package com.safronov.formula.demo.domain.DTO;

public class TeamCardDto {
    private Integer id;
    private String name;
    private String fullName;
    private String driver1Name;
    private String driver2Name;
    private String driver1ImageFilename;
    private String driver2ImageFilename;
    private String carImageFilename;
    private String logoUrl;

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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDriver1Name() {
        return driver1Name;
    }

    public void setDriver1Name(String driver1Name) {
        this.driver1Name = driver1Name;
    }

    public String getDriver2Name() {
        return driver2Name;
    }

    public void setDriver2Name(String driver2Name) {
        this.driver2Name = driver2Name;
    }

    public String getDriver1ImageFilename() {
        return driver1ImageFilename;
    }

    public void setDriver1ImageFilename(String driver1ImageFilename) {
        this.driver1ImageFilename = driver1ImageFilename;
    }

    public String getDriver2ImageFilename() {
        return driver2ImageFilename;
    }

    public void setDriver2ImageFilename(String driver2ImageFilename) {
        this.driver2ImageFilename = driver2ImageFilename;
    }

    public String getCarImageFilename() {
        return carImageFilename;
    }

    public void setCarImageFilename(String carImageFilename) {
        this.carImageFilename = carImageFilename;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
