package com.Miola.SpringDataRest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Miola.SpringDataRest.Modele.*;
import com.Miola.SpringDataRest.Service.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class PartieController {
	@Autowired
	private PartieService PartieService;
	
	
	@RequestMapping("/vacation")
	public Partie getVacation(){
		return PartieService.getVacation();
	}
}
