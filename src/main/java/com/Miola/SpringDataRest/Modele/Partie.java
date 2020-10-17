package com.Miola.SpringDataRest.Modele;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "programme")
	@JsonIgnore
	private Programme programme;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "partie")
	@JsonIgnore
	public List<Charge> charges;

	public Double getSomme() {
		return this.pourcentage * this.programme.getBudget() / 100;
	}

	public Double getReste() {
		Double temp = .0;
		for (Charge charge : charges) {
			temp += charge.getCreditDisponible();
		}
		return this.getSomme() - temp;
	}
	
	public String getCurrentYear() {
		return this.programme.getAnnee();
	}
}
