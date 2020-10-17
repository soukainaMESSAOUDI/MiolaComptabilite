import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table, Jumbotron } from 'react-bootstrap';
import axios from 'axios';

class Vacation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacation: ""
        };
    }
    componentDidMount() {
        this.getVacation();
    }

    getVacation() {
        axios.get("http://localhost:8080/vacation")
            .then(response => {
                this.setState({ vacation: response.data });
            });
    }
    render() {
        const vacation = this.state.vacation;
        return (
            <div >
                {	this.state.vacation.length === 0 ?
                    <h3 align="center">Aucune partie disponible.</h3>
                    :
                    <Card className="stepper-container-horizontal">
                        <Card.Header>
                            <h2>Le buget alloué pour les vacations:</h2>
                            <h3> {vacation.somme} MAD</h3>
                        </Card.Header>
                        <Card.Body>
                            <h4>Le Total des vacations: {vacation.totalVacation} MAD</h4>
                            <h4>Le Reste du Budget: {vacation.resteVacation} MAD</h4>
                        </Card.Body>
                    </Card>
                }
            </div>
        );
    }
}

export default Vacation;