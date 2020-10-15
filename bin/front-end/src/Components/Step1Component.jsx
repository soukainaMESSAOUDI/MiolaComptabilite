import React, { Component } from 'react';
import { Card, Form, Col, Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Step1Component extends Component {

    initialState = {
        reference: '',
        designation: '',
        pourcentage: '',
        parametre: '',
        partie: '',
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.partieChange = this.partieChange.bind(this);
        this.savePartie = this.savePartie.bind(this);
    }

    savePartie(event) {
        event.preventDefault();
        const partie = {
            reference: this.state.reference,
            designation: this.state.designation,
            pourcentage: this.state.pourcentage,
        }
        axios.post("http://localhost:8080/save-partie", partie)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    this.setState({ parametre: response.data.id });
                    console.log(this.state.parametre)
                    this.getPartie();
                }
            })
    }

    partieChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    getPartie() {
        axios.get("http://localhost:8080/partie-Id/" + this.state.parametre)
            .then(response => response.data)
            .then((data) => {
                this.setState({ partie: data });
                console.log(this.state.partie);
            })
    }

    render() {
        return (
            <Container>
                <div className="container">
                    <Card >
                        <Card.Header> Step 1 </Card.Header>
                        <Form id="addFormId" onSubmit={this.savePartie}>
                            <Card.Body>
                                <Form.Group as={Col} controlId="formGridReference">
                                    <Form.Label>Reference</Form.Label>
                                    <Form.Control required name="reference" type="text" value={this.state.reference}
                                        autoComplete="off" onChange={this.partieChange} placeholder="Enter reference" />
                                </Form.Group >
                                <Form.Group as={Col} controlId="formGridDesignation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control required name="designation" type="text" value={this.state.designation}
                                        autoComplete="off" onChange={this.partieChange} placeholder="Enter designation" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPourcentage">
                                    <Form.Label>Pourcentage</Form.Label>
                                    <Form.Control required name="pourcentage" type="number" value={this.state.pourcentage}
                                        autoComplete="off" onChange={this.partieChange} max={100} placeholder="Enter Pourcentage" />
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Button variant="primary" type="submit"> Calcul Somme </Button>
                                    {this.state.partie.somme}
                                </Row>

                                <Link to="/add2" className="btn btn-success">Suivant</Link>
                            </Card.Footer>
                        </Form>
                    </Card>
                    
                </div>
            </Container>
        );
    }
}

export default Step1Component;