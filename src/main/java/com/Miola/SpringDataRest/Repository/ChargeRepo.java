package com.Miola.SpringDataRest.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.Miola.SpringDataRest.Modele.Charge;
import com.Miola.SpringDataRest.Modele.Partie;

public interface ChargeRepo extends JpaRepository<Charge, Long> {

	public List<Charge> findByPartie(@Param("partie") Partie partieCours);

}
