package com.Miola.SpringDataRest.Modele;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Programme {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NonNull
	private String annee;
	private int nombreInscrit;
	@NonNull
	private Double coutFormation;
	@NonNull
	private Boolean enCours = true;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "programme")
	@JsonIgnore
	private List<Partie> parties;

	public Double getBudget() {
		return this.coutFormation * this.nombreInscrit;
	}

}
