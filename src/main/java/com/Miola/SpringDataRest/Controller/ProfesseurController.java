package com.Miola.SpringDataRest.Controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.Professeur;
import com.Miola.SpringDataRest.Service.ProfesseurService;


@CrossOrigin("http://localhost:3000")
@RestController
public class ProfesseurController {
	@Autowired
	private ProfesseurService ProfesseurService;
	
	
	@RequestMapping(method=RequestMethod.POST, value="/saveProf")
	public void saveProfesseurs(@RequestBody Professeur Professeur){
		ProfesseurService.SaveProf(Professeur);
	}
	
	@RequestMapping("/Professeurs")
	public List<Professeur> showProfesseurs(){
		return ProfesseurService.getAllProfesseurs();
	}

}
