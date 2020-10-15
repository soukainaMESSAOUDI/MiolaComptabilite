package com.Miola.SpringDataRest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
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
		partie.getSomme();
		return partieRepo.save(partie);
	}

	public List<Partie> saveAllParties(List<Partie> liste) {
		for (Partie partie : liste) {
			savePartie(partie);
		}
		return liste;
	}

	public List<Partie> getAllParties() {
		return programmeService.getCurrentProgramme().getParties();
	}

	public Partie getPartieById(Long id) {
		return partieRepo.findById(id).get();
	}

	public ResponseEntity<Partie> updatePartie(Long id, Partie partie) {
		Partie selectedPartie = partieRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Partie not founded " + id));
		selectedPartie.setReference(partie.getReference());
		selectedPartie.setPourcentage(partie.getPourcentage());
		selectedPartie.getSomme();
		Partie partieUpdated = partieRepo.save(selectedPartie);
		return ResponseEntity.ok(partieUpdated);
	}

	public void deletePartie(Long id) {
		partieRepo.deleteById(id);
	}

	public Partie getVacation() {
		return getPartieById(partieRepo.count());
	}

}
