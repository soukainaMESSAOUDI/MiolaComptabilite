import React, { Component } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import axios from 'axios';
import Vacation from './Vacation';
import "./Wizard.css";
import Navbar from '../Navigation/Navbar';

export default class ProfesseurList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			professeurs: []
		};
		this.addProfesseur = this.addProfesseur.bind(this);
	}

	componentDidMount() {
		this.getProfesseurs();
	}


	getProfesseurs() {
		axios.get("http://localhost:8080/Professeurs")
			.then(response => {
				this.setState({ professeurs: response.data });
				console.log(this.state.professeurs);
			});
	}


	addProfesseur = () => {
		this.props.history.push('/professeur');
	}

	Supprimer = (profID) => {
		axios.delete("http://localhost:8080/professeurs/" + profID)
			.then(response => {
				if (response.data != null) {
					this.setState({ "show": true });
					this.setState({
						professeurs: this.state.professeurs.filter(professeur => professeur.id !== profID)
					});
				} else {
					this.setState({ "show": false });
				}
			});
	};

	render() {
		return (
			<div>
				<Navbar />
				<Container>
					<h3>Vacations du programme actuel</h3>
					<Vacation />
					<br />
					<div className="container">
						<div className="row">
							<Button type="button" variant="info" className="button-add" style={{ width: "220px" }}
								onClick={this.addProfesseur}>Ajouter un Professeur</Button>
						</div>
						<br />
					</div>
					<div className="row">
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Nom Complet</th>
									<th>Grade  </th>
									<th>Volume Horaire </th>
									<th>Statut</th>
									<th>Salaire Brute</th>
									<th>Salaire Net</th>
									<th>Nombre de jours</th>
								</tr>
							</thead>
							<tbody>
								{this.state.professeurs.length === 0 ?
									<tr align="center">
										<td colSpan="6">Aucun professeur disponible.</td>
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
					</div>
				</Container>
			</div>
		);
	}
}