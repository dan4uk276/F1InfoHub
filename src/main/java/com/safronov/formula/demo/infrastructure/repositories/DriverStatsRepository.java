package com.safronov.formula.demo.infrastructure.repositories;

import com.safronov.formula.demo.domain.entity.DriverStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverStatsRepository extends JpaRepository<DriverStats,Integer> {

}
