package com.Miola.SpringDataRest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Modele.Programme;
import com.Miola.SpringDataRest.Service.PartieService;
import com.Miola.SpringDataRest.Service.ProgrammeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProgrammeController {

	@Autowired
	private ProgrammeService programmeService;
	@Autowired
	private PartieService partieService;

	private static Double resteBudget;
	private static int percentGlobal;

	
	@GetMapping("/all-programmes")
	public List<Programme> getAllProgrammes() {
		return programmeService.getAllProgrammes();
	}

	@GetMapping("/programme-actuel")
	public Programme getCurrentProgramme() {
		return programmeService.getCurrentProgramme();
	}

	@PostMapping("/save-programme")
	public Programme saveProgramme(@RequestBody Programme programme) {
		return programmeService.saveProgramme(programme);
	}

	@GetMapping("/reste-budget")
	public Double initBudget() {
		return resteBudget = getCurrentProgramme().getBudget();
	}

	@GetMapping("/reste-percent")
	public int initPercent() {
		return percentGlobal = 100;
	}

	@PostMapping("/save-partie")
	public Partie savePartie(@RequestBody Partie partie) {
		return partieService.savePartie(partie);
	}

	@PostMapping("/save-all-parties")
	public List<Partie> saveAllPartie(@RequestBody List<Partie> parties) {
		return partieService.saveAllParties(parties);
	}

	@GetMapping("/partie-Id/{id}")
	public Partie findPartieById(@PathVariable Long id) {
		return partieService.getPartieById(id);
	}

	@GetMapping("/parties")
	public List<Partie> getAllParties() {
		return partieService.getAllParties();
	}

	@DeleteMapping("/parties/{id}")
	public void deletePartie(@PathVariable Long id) {
		partieService.deletePartie(id);
	}

	@PutMapping("/parties/{id}")
	public void updatePartie(@PathVariable Long id, @RequestBody Partie partie) {
		partieService.updatePartie(id, partie);
	}


}
