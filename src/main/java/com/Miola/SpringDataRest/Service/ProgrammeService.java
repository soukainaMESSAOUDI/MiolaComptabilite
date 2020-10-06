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
		return programmeRepo.findLastProgramme();
	}

	public Programme saveProgramme(Programme programme) {
		programme.getBudget();
		return programmeRepo.save(programme);
	}

}
