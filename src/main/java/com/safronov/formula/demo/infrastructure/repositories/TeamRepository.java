package com.safronov.formula.demo.infrastructure.repositories;

import com.safronov.formula.demo.domain.entity.Driver;
import com.safronov.formula.demo.domain.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team,Integer> {
    List<Team> findByFullNameContainingIgnoreCase(String fullName);
}
