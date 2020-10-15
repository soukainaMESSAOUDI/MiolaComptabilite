package com.Miola.SpringDataRest.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.Miola.SpringDataRest.Modele.Partie;

public interface PartieRepo extends JpaRepository<Partie, Long> {
	
	/*@Query(value="select p from partie p where p.designation =?1 order by programme desc ")
	List<Partie> getLast(String a);*/

}
