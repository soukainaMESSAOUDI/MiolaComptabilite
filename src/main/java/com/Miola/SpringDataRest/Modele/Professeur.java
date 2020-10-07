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
@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Professeur {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@NonNull
	private String NomComplet;
	@NonNull
	private String grade;
	@NonNull
	private int nbrJour;
	
	public int getVacation() {
		int tarif;
		if(this.grade.equals("PA"))
			tarif=1000;
		else {
			if(this.grade.equals("PH"))
				tarif=2500;
			else
				tarif=2000;
		}
		return tarif*this.nbrJour;
	}

}
