import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Col, Button } from 'react-bootstrap';
import "./Wizard.css";
import Navbar from '../Navigation/Navbar';

export default class Professeur extends Component {

	initialState = {
		nomComplet: '',
		grade: 'PA',
		type: 'interne',
		nbrHeur: ''
	}

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.professeurChange = this.professeurChange.bind(this);
		this.submitProfesseur = this.submitProfesseur.bind(this);
	}

	submitProfesseur(event) {
		event.preventDefault();
		const professeur = {
			nomComplet: this.state.nomComplet,
			grade: this.state.grade,
			nbrHeur: this.state.nbrHeur,
			type: this.state.type
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
		this.setState(
			{ [event.target.name]: event.target.value }
		);
	}

	render() {
		const styleLabel = { float: "left" };
		return (
			<>
				<Navbar />
				<div className="stepper-container-horizontal">
					<Card className="card-resume">
						<Card.Header>
							<h3>Ajouter un Professeur </h3>
						</Card.Header>
						<Form onSubmit={this.submitProfesseur} id="ProfesseurFormId">
							<Card.Body>
								<Form.Group as={Col} controlId="formGridCouleur">
									<Form.Label style={styleLabel}> Nom complet </Form.Label>
									<Form.Control name="nomComplet" autoComplete="off" required type="text"
										value={this.state.nomComplet} onChange={this.professeurChange} placeholder="Entrez le nom complet " />
								</Form.Group>
								<Form.Group as={Col} controlId="formGridGrade">
									<Form.Label style={styleLabel}> Grade </Form.Label>
									<select class="form-control" name="grade" onChange={this.professeurChange} value={this.state.grade} onChange={this.professeurChange}>
										<option>PA</option>
										<option>PH</option>
										<option>PES</option>
									</select>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridGrade">
									<Form.Label style={styleLabel}>Statut </Form.Label>
									<select class="form-control" name="type" onChange={this.professeurChange} value={this.state.type} onChange={this.professeurChange}>
										<option>Interne</option>
										<option>Externe</option>
									</select>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridCouleur">
									<Form.Label style={styleLabel}> Volume horaire </Form.Label>
									<Form.Control name="nbrHeur" autoComplete="off" required type="number"
										value={this.state.nbrHeur} onChange={this.professeurChange} placeholder="Entrez le volume horaire " />
								</Form.Group>
							</Card.Body>
							<Card.Footer style={{ "textAlign": "right" }}>
								<Button size="sm" variant="success" type="submit" >  Enregistrer </Button>{' '}
								<Button size="sm" variant="info" type="reset">  Réinitialiser </Button>
							</Card.Footer>
						</Form>
					</Card>
				</div>
			</>
		);
	}
}