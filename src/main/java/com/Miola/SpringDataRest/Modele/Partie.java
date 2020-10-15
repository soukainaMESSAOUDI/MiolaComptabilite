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

import com.Miola.SpringDataRest.Service.ProgrammeService;
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
	public List<Professeur> profs;

	public Double getSomme() {
		return this.pourcentage * this.programme.getBudget() / 100;
	}

	public Double getTotalVacation() {
		Double s = .0;
		for (Professeur p : profs)
			s += p.getNet();
		return s;
	}

	public Double getReste() {
		return this.getSomme() - this.getTotalVacation();
	}

}
