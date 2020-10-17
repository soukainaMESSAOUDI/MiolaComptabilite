package com.Miola.SpringDataRest.Service;

import java.util.ArrayList;
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

	public Partie getPartieCharge() {
		Partie selected = new Partie();
		for (Partie partie : getAllParties()) {
			if (partie.getDesignation().equals("Charges")) {
				selected = partie;
			}
		}
		return selected;
	}

	public List<Partie> getParties() {
		return partieRepo.findAll();
	}

	public List<Partie> getALLCharges() {
		List<Partie> parties = this.getParties();
		List charges = new ArrayList();
		for (Partie p : parties) {
			if (p.getDesignation().equals("Charges"))
				charges.add(p);
		}
		return charges;
	}

	public List<Partie> getALLVacation() {
		List<Partie> parties = this.getParties();
		List vacations = new ArrayList();
		for (Partie p : parties) {
			if (p.getDesignation().equals("Vacations"))
				vacations.add(p);
		}
		return vacations;
	}

	public Partie getCurrentVacation() {
		Partie selected = new Partie();
		for (Partie partie : getAllParties()) {
			if (partie.getDesignation().equals("Vacations")) {
				selected = partie;
			}
		}
		return selected;
	}
}
