package com.Miola.SpringDataRest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Miola.SpringDataRest.Modele.Programme;
import com.Miola.SpringDataRest.Repository.ProgrammeRepo;

@Service
public class ProgrammeService {

	@Autowired
	private ProgrammeRepo programmeRepo;

	public List<Programme> getAllProgrammes() {
		return programmeRepo.findAll();
	}

	public Programme getCurrentProgramme() {
		return programmeRepo.findByEnCours(true);
	}

	public void updateProgrammeEnCours() {
		for (Programme item : programmeRepo.findAll()) {
			item.setEnCours(false);
		}
	}

	public Programme saveProgramme(Programme programme) {
		programme.getBudget();
		updateProgrammeEnCours();
		return programmeRepo.save(programme);
	}

	public Programme findById(Long id) {
		return programmeRepo.findById(id).get();
	}

}
