package com.Miola.SpringDataRest.Modele;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Partie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NonNull
	private String reference;
	@NonNull
	private String designation;
	private int pourcentage;
	@NonNull
	private Double somme;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "programme")
	@JsonIgnore
	private Programme programme;

}
