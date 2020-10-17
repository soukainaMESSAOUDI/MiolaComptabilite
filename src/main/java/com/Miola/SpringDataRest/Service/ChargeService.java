package com.Miola.SpringDataRest.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Miola.SpringDataRest.Modele.Charge;
import com.Miola.SpringDataRest.Repository.ChargeRepo;

@Service
public class ChargeService {

	@Autowired
	private ChargeRepo chargeRepo;

	@Autowired
	private PartieService partieService;

	// Get charges of current Program : Done
	public List<Charge> getAllCharges() {
		return chargeRepo.findByPartie(partieService.getPartieCharge());
	}

	// Save new charge : Done
	public Charge saveCharge(Charge charge) {
		charge.setPartie(partieService.getPartieCharge());
		return chargeRepo.save(charge);
	}

	// get charge by id
	public Charge getChargeById(Long id) {
		return chargeRepo.findById(id).get();
	}

	// Update Charge : Done
	public ResponseEntity<Charge> updateCharge(Long id, Charge charge) {
		Charge selectedCharge = chargeRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Charge introuvable " + id));
		selectedCharge.setRubrique(charge.getRubrique());
		selectedCharge.setDesignation(charge.getDesignation());
		selectedCharge.setCreditDisponible(charge.getCreditDisponible());
		Charge chargeUpdated = chargeRepo.save(selectedCharge);
		return ResponseEntity.ok(chargeUpdated);
	}

	// Delete charge : Done
	public ResponseEntity<Map<String, Boolean>> deleteCharge(Long id) {
		Charge selectedCharge = chargeRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Charge introuvable " + id));
		chargeRepo.delete(selectedCharge);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);

	}

	// Get charges of all Program : Done
	public List<Charge> getAll() {
		return chargeRepo.findAll();
	}
}
