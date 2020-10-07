import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Col , Button} from 'react-bootstrap';
export default class Professeur extends Component{
  initialState = {
	nomComplet:'',
	grade:'PE',
	nbrJour:0
  }
  constructor(props) {
	super(props);
	this.state=this.initialState;
	this.professeurChange = this.professeurChange.bind(this);
	this.submitProfesseur = this.submitProfesseur.bind(this);
  }
  submitProfesseur(event) {
	event.preventDefault();
	const professeur={
		nomComplet:this.state.nomComplet,
		grade:this.state.grade,
		nbrJour:this.state.nbrJour
	}
	axios.post("http://localhost:8080/saveProf", professeur)
	.then(response => {
  	if (response.data != null) {
    	this.setState(this.initialState);
    	this.props.history.push('/Professeurs')
  	}
	})
	
  }
  professeurChange(event) {
	this.setState (
  	{ [event.target.name]:event.target.value }
	) ;
  }
  render(){
	return(
  	<Card className={"border border-dark bg-dark text-white"}>
        	<Card.Header>
           	Ajouter une Professeur
          	</Card.Header>
        	<Form onSubmit={this.submitProfesseur} id="ProfesseurFormId">
        	<Card.Body>
        	<Form.Row>
			<Form.Group as={Col} controlId="formGridCouleur">
            	<Form.Label> Le nom complet </Form.Label>
            	<Form.Control name="nomComplet" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.nomComplet}  onChange = {this.professeurChange} placeholder= "Entrez Le Nom "/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridGrade">
            	<Form.Label> Le grade </Form.Label>
            	<select class="form-control bg-dark text-white" name="grade" onChange = {this.professeurChange}  value = {this.state.grade}  onChange = {this.professeurChange}>
      				<option>PA</option>
     				<option>PH</option>
     				<option>PES</option>
    			</select>
				</Form.Group>
            	<Form.Group as={Col} controlId="formGridCouleur">
            	<Form.Label> Le nombre de jours </Form.Label>
            	<Form.Control name="nbrJour" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.nbrJour}  onChange = {this.professeurChange} placeholder= "Entrez Le Nombre de jours "/>
            	</Form.Group>
        	</Form.Row>
        	</Card.Body>
        	<Card.Footer style={{"textAlign":"right"}}>
            	<Button size="sm" variant="success" type="submit" >  Submit </Button>{' '}
            	<Button size="sm" variant="info" type="reset">  Reset </Button>
        	</Card.Footer>
        	</Form>
        	</Card>
      	);
      	}
    	}
