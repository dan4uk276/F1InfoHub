package com.safronov.formula.demo.domain.dto;

public record TeamCard(
        Integer id,
        String name,
        String fullName,
         String driver1Name,
        String driver2Name,
        String driver1ImageFilename,
        String driver2ImageFilename,
        String carImageFilename,
        String logoUrl
){}
