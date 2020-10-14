package com.Miola.SpringDataRest.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Modele.Professeur;
import com.Miola.SpringDataRest.Repository.ProfesseurRepo;

@Service
public class ProfesseurService {
	@Autowired
	private PartieService partieService;
	@Autowired 
	private ProfesseurRepo ProfesseurRepo;
	
		public void SaveProf(Professeur Professeur) {
			Partie partie=partieService.getVacation();
			Professeur.setPartie(partie);	
			partie.profs.add(Professeur);
			ProfesseurRepo.save(Professeur);
	}
	
	public List<Professeur> getAllProfesseurs() { 
		List<Professeur> Professeur=new ArrayList<>();
		ProfesseurRepo.findAll().forEach(Professeur::add);
		return Professeur; 
	}
	
	public Optional<Professeur> getProfesseur(Integer id) {
		return ProfesseurRepo.findById(id);	
	}
	
	public void ajouterProfesseur(Professeur Professeur) {
		ProfesseurRepo.save(Professeur); 
	}
	
	
	public void modifierProfesseur(Professeur Professeur) {
		ProfesseurRepo.save(Professeur); 
	}
	
	public void supprimerProfesseur(Integer id) {
		ProfesseurRepo.deleteById(id); 	
	}

}
