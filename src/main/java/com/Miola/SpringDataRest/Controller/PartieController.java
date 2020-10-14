package com.Miola.SpringDataRest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Repository.PartieRepo;
import com.Miola.SpringDataRest.Service.PartieService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PartieController {

	@Autowired
	private PartieService partieService;

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

	@PutMapping("/parties/{id}")
	public ResponseEntity<Partie> updatePartie(@PathVariable Long id, @RequestBody Partie partie) {
		return partieService.updatePartie(id, partie);
	}

	@DeleteMapping("/parties/{id}")
	public void deletePartie(@PathVariable Long id) {
		partieService.deletePartie(id);
	}

}
