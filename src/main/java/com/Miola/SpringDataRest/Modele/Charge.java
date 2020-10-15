package com.Miola.SpringDataRest.Modele;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Charge {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NonNull
	private String rubrique;
	@NonNull
	private String designation;
	@NonNull
	private Double creditDisponible;
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "partie")
	//@JsonIgnore
	private Partie partie;
	
	
	

}
