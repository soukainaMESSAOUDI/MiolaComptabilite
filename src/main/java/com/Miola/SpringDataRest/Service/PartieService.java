package com.Miola.SpringDataRest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Miola.SpringDataRest.Modele.Partie;

import com.Miola.SpringDataRest.Repository.PartieRepo;

@Service
public class PartieService {
	@Autowired
	private ProgrammeService programmeService;
	@Autowired
	private PartieRepo partieRepo;

	public Partie savePartie(Partie partie) {
		partie.setProgramme(programmeService.getCurrentProgramme());
		return partieRepo.save(partie);
	}

	public List<Partie> saveAllParties(List<Partie> liste) {
		for (Partie partie : liste) {
			savePartie(partie);
		}
		return liste;
	}

	public Partie getPartieById(Long id) {
		return partieRepo.findById(id).get();
	}

	public List<Partie> getAllParties() {
		return programmeService.getCurrentProgramme().getParties();
	}

	public void deletePartie(Long id) {
		partieRepo.deleteById(id);
	}

	public void updatePartie(Long id, Partie partie) {
		partieRepo.save(partie);
	}
	
	public Partie getVacation() {
		return getPartieById(partieRepo.count());
	}

}
