package com.Miola.SpringDataRest.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.Charge;
import com.Miola.SpringDataRest.Modele.Partie;
import com.Miola.SpringDataRest.Repository.ChargeRepository;
import com.Miola.SpringDataRest.Service.ChargeService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ChargeController {
	@Autowired
	private ChargeRepository chargeRepository;
	@Autowired
	private ChargeService chargeService;
	
	@GetMapping("/charges")
	public List<Charge> getAllCharges() {
		return chargeService.getAllCharges();
	}
	
	@GetMapping("/charge/partie")
	public Partie getPartie() {
		return chargeService.getAllCharges().get(0).getPartie();
	}
	
	@PostMapping("/save-charge")
	public Charge saveCharge(@RequestBody Charge charge) {
		return chargeService.saveCharge(charge);
	}
	//get charge by id

	@GetMapping("/charges/{id}")
	public Charge findChargeById(@PathVariable Long id) {
		return chargeService.getChargeById(id);
	}

	//update 
	@RequestMapping(value = "/update-charges/{id}", method = RequestMethod.PUT)	
	public ResponseEntity<Charge> updateCharge(@PathVariable Long id,@RequestBody Charge charge){
		return chargeService.updateCharge(id, charge);
	}
	//delete
	@DeleteMapping("/delete-charge/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteCharge (@PathVariable Long id){
		return chargeService.deleteCharge(id);
	}

}
