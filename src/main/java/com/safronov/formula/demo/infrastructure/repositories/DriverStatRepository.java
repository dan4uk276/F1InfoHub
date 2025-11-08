package com.safronov.formula.demo.infrastructure.repositories;

import com.safronov.formula.demo.domain.entity.DriverStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverStatRepository extends JpaRepository<DriverStat,Integer> {

}
