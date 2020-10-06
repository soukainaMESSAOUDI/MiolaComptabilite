package com.Miola.SpringDataRest.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Miola.SpringDataRest.Modele.Programme;

public interface ProgrammeRepo extends JpaRepository<Programme, Long> {
	
	public Programme findByEnCours(@Param("enCours") Boolean enCours);
	
	@Query("select p from Programme p where p.annee = (select Max(annee) from Programme)")
	  public Programme findLastProgramme();

}
