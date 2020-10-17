import React, { Component } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../Navigation/Navbar';

export default class Vacations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacations: []
        };
        this.addVacation = this.addVacation.bind(this);
    }

    componentDidMount() {
        this.getVacation();
    }

    getVacation() {
        axios.get("http://localhost:8080/allVacations")
            .then(response => {
                this.setState({ vacations: response.data });
                console.log(this.state.vacations);
            });
    }

    addVacation = () => {
        this.props.history.push('/Professeurs');
    }

    render() {
        return (
            <div>
                <Navbar />
                <Container>
                    <h3>Liste des vacations</h3>
                    <div className="container">
                        <div className="row">
                            <Button type="button" variant="info" className="button-add" style={{ width: "220px" }}
                                onClick={this.addVacation}>Etat des paiements actuels</Button>
                        </div>
                        <br />
                    </div>
                    <div className="row">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Année universitaire</th>
                                    <th>Budget alloué aux vacations  </th>
                                    <th>Total des vacations </th>
                                    <th>Reste du budget </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.vacations.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">Aucune vacation disponible.</td>
                                    </tr> :
                                    this.state.vacations.map((vacation) => (
                                        <tr key={vacation.id}>
                                            <td>{vacation.annee}</td>
                                            <td>{vacation.somme} MAD</td>
                                            <td>{vacation.totalVacation} MAD</td>
                                            <td>{vacation.reste} MAD</td>
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