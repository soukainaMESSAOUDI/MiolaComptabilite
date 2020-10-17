import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
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
                    <CardDeck>
                        <Card style={{ backgroundColor: '#e6f7ff' }} >
                            <Card.Header>Buget alloué aux vacations :</Card.Header>
                            <Card.Body >
                                {vacation.somme} MAD
                        </Card.Body>
                        </Card>
                        <Card style={{ backgroundColor: '#e6f7ff' }}>
                            <Card.Header>Total des vacations : </Card.Header>
                            <Card.Body>
                                {vacation.totalVacation} MAD
                            </Card.Body>
                        </Card>

                        <Card style={{ backgroundColor: '#e6f7ff' }} >
                            <Card.Header>Reste du Budget : :</Card.Header>
                            <Card.Body >
                                {vacation.resteVacation} MAD
                        </Card.Body>
                        </Card>
                    </CardDeck>


                }
            </div>
        );
    }
}

export default Vacation;