import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table } from 'react-bootstrap';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ProfesseurList extends Component {
	constructor(props) {
    	super(props);
		this.state = { professeurs: [] };
		this.addProfesseur=this.addProfesseur.bind(this);
		this.Supprimer=this.Supprimer.bind(this);
	}
	componentDidMount() {
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
        	<Card className={"border border-dark bg-dark text-white"}>
        	<Card.Header className="text-center"> 
				<h3>Liste des professeurs</h3>
			</Card.Header>
        	<Card.Body>
			<Button size="sm" variant="btn btn-primary my-3" marginRight='O' onClick={this.addProfesseur}>			
                	Ajouter un Professeur
             </Button>
        	<Table bordered hover striped variant="dark"><thead>
            	<tr>
                	<th>Nom Complet</th>
                	<th>Le Grade  </th>
                	<th>Nombre de jours </th>
					<th>Vacation </th>
					<th>Actions </th>
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
                  		<td>{professeur.nbrJour} </td>
						<td>{professeur.vacation} MAD </td>
						<td>
							<Button size="sm" className="btn btn-info" >
                     			 Modifier
                    		</Button>
                            <Button size="sm" className="btn btn-info" onClick={()=>this.Supprimer(professeur.id)}>
                     			 Supprimer
                    		</Button>
						</td>
					
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
