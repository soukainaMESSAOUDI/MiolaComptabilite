import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table,Jumbotron} from 'react-bootstrap';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Vacation from './Vacation';
import Chart from './Chart';
import "./Wizard.css";
export default class ProfesseurList extends Component {
	constructor(props) {
    	super(props);
		this.state = { 
			professeurs: []
		 };
		this.addProfesseur=this.addProfesseur.bind(this);
	
	}
	componentDidMount() {
		this.getProfesseurs();
	}
	getProfesseurs(){
		fetch('http://localhost:8080/Professeurs')
        	.then((response) => response.json())
        	.then((responseData) => {
            	this.setState({
                	professeurs: responseData
            	});
        	})
        	.catch(err => console.error(err));
	}
	addProfesseur = () => {
		this.props.history.push('/vacations');
	}

	Supprimer = (profID) => {
		axios.delete("http://localhost:8080/professeurs/"+profID)
		  .then(response => {
			if(response.data != null){
			  this.setState({"show":true});
			  this.setState({
				professeurs: this.state.professeurs.filter(professeur => professeur.id !== profID)
			  });
			}else {
			  this.setState({"show":false});
			}
		  });
	  };
	
	render() {
    	return (
        	<div>
			<div class="row">
				<div classname="col-md-8" float="left">
					<Chart/>
				</div>
				<div classname="col-md-4" >
					<Vacation/>
				</div>
				
			</div>
				
        	<Card>
        	<Card.Header className="text-center"> 
				<h2>Liste des professeurs</h2>
			</Card.Header>
        	<Card.Body>
			<Button size="sm" variant="btn btn-primary my-3" marginRight='O' onClick={this.addProfesseur}>			
                	Ajouter un Professeur
             </Button>
        	<Table><thead>
            	<tr className=" bg-dark text-white">
                	<th>Nom Complet</th>
                	<th>Le Grade  </th>
                	<th>Volume Horaire </th>
					<th>Le type </th>
					<th>Salaire Brute</th>
					<th>Salaire Net</th>
					<th>Nombre de jours</th>
					
					
                </tr>
        	</thead>
        	<tbody>
        	{	this.state.professeurs.length ===0 ?
              	<tr align="center">
                  	<td colSpan="6">Aucune professeur disponible.</td>
                </tr> :
                	this.state.professeurs.map((professeur) => (
                  	<tr key={professeur.id}>
                  		<td>{professeur.nomComplet}</td>
                  		<td>{professeur.grade}</td>
                  		<td>{professeur.nbrHeur} </td>
						<td>{professeur.type} </td>
						<td>{professeur.brute} MAD </td>
						<td>{professeur.net} MAD </td>
						<td>{professeur.jours} </td>
						
						
                  	</tr>
					  
                	))
              	}
                	</tbody>
                	</Table>
          	</Card.Body>
          	</Card>
        	</div>
    	);
	}
}
