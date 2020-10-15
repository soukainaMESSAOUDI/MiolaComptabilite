import React, { Component } from 'react';
import { Container, Card, ButtonGroup, Button } from 'react-bootstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

class ProgrammeActuelComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            programmeActuel: '',
            parties: [],
            selectedPartie: '',
        };
    }

    componentDidMount() {
        this.getProgrammeActuel();
        this.getParties();
    }

    getProgrammeActuel() {
        axios.get("http://localhost:8080/programme-actuel")
            .then(response => {
                this.setState({ programmeActuel: response.data });
            });
    }

    getParties() {
        axios.get("http://localhost:8080/parties")
            .then(response => response.data)
            .then((data) => {
                this.setState({ parties: data });
            })
    }

    updatePartie(partieId) {
        console.log(partieId);
        axios.put("http://localhost:8080/parties/" + partieId)
            .then(response => {
                if (response.data != null) {

                }
            });
    }

    getSelectedPartie(partieId) {
        axios.get("http://localhost:8080/partie-Id/" + partieId)
            .then(response => response.data)
            .then((data) => {
                this.setState({ selectedPartie: data });
                console.log(this.state.selectedPartie);
            })
    }

    render() {

        const programme = this.state.programmeActuel;
        const tableRows = this.state.parties.map((partie) =>
            <tr key={partie.id}>
                <td>{partie.reference}</td>
                <td>{partie.designation}</td>
                <td>{partie.pourcentage}</td>
                <td>{partie.somme}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" variant="primary btn-group-link"
                            onClick={this.getSelectedPartie.bind(this, partie.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Link to={""} className="btn btn-success btn-sm btn-group-link"
                            onClick={this.updatePartie.bind(this, partie.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>

                    </ButtonGroup>
                </td>
            </tr >
        );

        return (
            <div>
                <Container>
                    <h3>PROGRAMME D'EMPLOI  {programme.annee} </h3>
                    <Card >
                        <Card.Body>
                            <Card.Title>PE FORMATION DES FONCTIONNAIRES ET DES SALARIES EN
                            Master Internet des Objets : Logiciel et Analytique</Card.Title>
                            <Card.Text>
                                <br />
                                <li>  Nombre des etudiants inscrits : {programme.nombreInscrit} </li>
                                <br />
                                <li>  Cout de la formation Miola : {programme.coutFormation} </li>
                                <br />
                                <li>   Budget total du programme : {programme.budget} </li>
                                <br />
                            </Card.Text>
                            <div className="tableProgramme">
                                <div className="row">
                                    <table className="table table-striped table-bordered table-hover"  >
                                        <thead>
                                            <tr>
                                                <th>Référence</th>
                                                <th>Désignation</th>
                                                <th>Pourcentage</th>
                                                <th>Somme</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default ProgrammeActuelComponent;