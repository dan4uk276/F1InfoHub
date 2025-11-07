package com.safronov.formula.demo.infrastructure.repositories;

import com.safronov.formula.demo.domain.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver,Integer> {
    List<Driver> findByNameContainingIgnoreCase(String name);

    List<Driver> findByNumber(Integer name);

    List<Driver> findByTeamNameContainingIgnoreCase(@Param("teamName") String teamName);

    List<Driver> findByCountryContainingIgnoreCase(String country);

    @Query("SELECT d FROM Driver d WHERE d.team IS NOT NULL")
    List<Driver> findAllDrivers();

}
