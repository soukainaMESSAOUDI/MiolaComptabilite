package com.Miola.SpringDataRest.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Miola.SpringDataRest.Modele.Charge;
import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Repository.ChargeRepository;

@Service
public class ChargeService {
	
	@Autowired
	private ChargeRepository chargeRepository;
	
	//get all charges
	public List<Charge> getAllCharges(){
		return chargeRepository.findAll();
	}
	
	//save a new charge
	public Charge saveCharge(Charge charge) {
		return chargeRepository.save(charge);
	}
	//get charge by id
	public Charge getChargeById(Long id) {
		return chargeRepository.findById(id).get();
	}
	//update CHarge
	public ResponseEntity<Charge> updateCharge(Long id, Charge charge) {
		Charge selectedCharge = chargeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Charge introuvable " + id));
		selectedCharge.setRubrique(charge.getRubrique());
		selectedCharge.setDesignation(charge.getDesignation());;
		selectedCharge.setCreditDisponible(charge.getCreditDisponible());;
		Charge chargeUpdated = chargeRepository.save(selectedCharge);
		return ResponseEntity.ok(chargeUpdated);
	}
	
	//delete charge
	public ResponseEntity< Map<String,Boolean>>deleteCharge(Long id){
		Charge selectedCharge = chargeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Charge introuvable " + id));
		chargeRepository.delete(selectedCharge);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}


}
