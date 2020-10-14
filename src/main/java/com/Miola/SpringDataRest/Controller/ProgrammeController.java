package com.Miola.SpringDataRest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Modele.Programme;
import com.Miola.SpringDataRest.Service.ProgrammeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProgrammeController {

	@Autowired
	private ProgrammeService programmeService;

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

	@GetMapping("/programme-Id")
	public Programme findProgrammeById(@PathVariable Long id) {
		return programmeService.findById(id);
	}

}
