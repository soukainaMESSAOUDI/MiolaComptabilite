import React, { Component } from 'react';
import { ButtonGroup, Button, Card, CardDeck } from 'react-bootstrap';
import axios from 'axios';



class CardCharge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partie: ""
        }
    }

    componentDidMount() {
        this.getPartie();
    }

    getPartie() {
        axios.get("http://localhost:8080/charge/partie")
            .then(response => {
                this.setState({ partie: response.data });
                console.log(this.state.partie);
            });
    }

    render() {
        const partie = this.state.partie;
        return (
            <>
                <CardDeck>
                    <Card style={{ backgroundColor: '#e6f7ff' }} >
                        <Card.Header>Budget initial des charges :</Card.Header>
                        <Card.Body >
                            {partie.somme} MAD
                        </Card.Body>
                    </Card>
                    <Card style={{ backgroundColor: '#e6f7ff'}}>
                        <Card.Header> Budget restant : </Card.Header>
                        <Card.Body>
                            {partie.reste} MAD
                            </Card.Body>
                    </Card>
                </CardDeck>
                <br />
            </>
        );
    }
}

export default CardCharge;