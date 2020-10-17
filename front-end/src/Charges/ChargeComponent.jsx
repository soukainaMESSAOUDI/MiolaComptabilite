import React, { Component } from 'react';
import { Container, Button, Modal, Form, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import ChargeService from '../Services/ChargeService';
import CardCharge from './CardCharge';
import Navbar from '../Navigation/Navbar';

class ChargeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partie: '',
            charges: [],

            rubrique: '',
            designation: '',
            creditDisponible: '',

            rubriqueUpdated: '',
            designationUpdated: '',
            creditDisponibleUpdated: '',

            hidden: true,
            updateModalShow: false,
            index: '',
        };

        this.deleteCharge = this.deleteCharge.bind(this);
        this.changeRubriqueHandler = this.changeRubriqueHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeCreditHandler = this.changeCreditHandler.bind(this);
        this.updateCharge = this.updateCharge.bind(this);
        this.chargeChange = this.chargeChange.bind(this);

    }

    getPartie() {
        axios.get("http://localhost:8080/charge/partie")
            .then(response => {
                this.setState({ partie: response.data });
                console.log(this.state.partie);
            });
    }

    chargeChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    deleteCharge(id) {
        ChargeService.deleteCharge(id).then(res => {
            this.setState({ charges: this.state.charges.filter(charge => charge.id !== id) });
        });
    }

    componentDidMount() {
        this.getPartie();
        axios.get("http://localhost:8080/charges").then((res) => {
            this.setState({ charges: res.data });

        });
    }

    ajouterHandler = (e) => {
        this.setState({ hidden: false })
    }

    changeRubriqueHandler = (event) => {
        this.setState({ rubrique: event.target.value });
    }

    changeDesignationHandler = (event) => {
        this.setState({ designation: event.target.value });
    }

    changeCreditHandler = (event) => {
        this.setState({ creditDisponible: event.target.value });
    }

    calculerHandler = (e) => {
        e.preventDefault();
        let charge = {
            rubrique: this.state.rubrique,
            designation: this.state.designation,
            creditDisponible: this.state.creditDisponible,
        };

        if (this.state.creditDisponible > this.state.partie.reste) {
            alert("La somme saisie est supérieure au budget restant");
        } else if (this.state.creditDisponible <= this.state.partie.reste) {
            axios.post("http://localhost:8080/save-charge", charge)
                .then(response => {
                    if (response.data != null) {
                        console.log(charge);
                    }
                });
            window.location.reload(false);
        }

    }

    cancel() {
        this.setState({ hidden: true });
    }

    updateCharge(event) {
        event.preventDefault();
        const charge = { rubrique: this.state.rubriqueUpdated, designation: this.state.designationUpdated, creditDisponible: this.state.creditDisponibleUpdated };
        const id = this.state.index;
        console.log(id);
        axios.put("http://localhost:8080/update-charges/" + id, charge)
            .then(response => {
                if (response.data != null) {
                    this.setState({ updateModalShow: false });
                }
            });
        window.location.reload(false);
    }

    render() {
        let updateModalClose = () => this.setState({ updateModalShow: false });

        return (
            <div>
                <Navbar />
                <Container>
                    <h3>GESTION DES CHARGES</h3>
                    <div class="row">
                        <div className="col-md-6 centre" >
                            <CardCharge />
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <Button variant="info" onClick={this.ajouterHandler} style={{marginBottom:"20px"}}>Ajouter </Button>
                        </div>
                    </div>
                    <div className="row">
                        <Table class="margin-top-bottom margin-left-right" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rubrique</th>
                                    <th>Designation</th>
                                    <th>Credit disponible</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="form" hidden={this.state.hidden} >
                                    <td><input type="text" placeholder="abc" name="rubrique" className="form-control"
                                        value={this.state.label} onChange={this.changeRubriqueHandler} /></td>
                                    <td><input type="text" placeholder="abc" name="designation" className="form-control"
                                        value={this.state.description} onChange={this.changeDesignationHandler} /></td>
                                    <td><input type="text" placeholder="0.00" name="creditDisponible" className="form-control"
                                        value={this.state.nbrUnite} onChange={this.changeCreditHandler} /></td>
                                    <td>
                                        <button type="button" class="btn btn-info  margin-left-right-bis " onClick={this.calculerHandler.bind(this)} >Ajouter</button>
                                        <button type="button" class="btn btn-danger margin-left-right-bis  " onClick={this.cancel.bind(this)}> Annuler </button>
                                    </td>
                                </tr>
                                {this.state.charges.map(
                                    charge =>
                                        <tr key={charge.id}>
                                            <td>{charge.rubrique}</td>
                                            <td>{charge.designation}</td>
                                            <td>{charge.creditDisponible}</td>
                                            <td>
                                                <button onClick={() => {
                                                    this.setState({
                                                        updateModalShow: true,
                                                        rubriqueUpdated: charge.rubrique,
                                                        designationUpdated: charge.designation,
                                                        creditDisponibleUpdated: charge.creditDisponible,
                                                        index: parseInt(charge.id),
                                                    })
                                                }} className="btn btn-success margin-left-right-bis">Modifier</button>
                                                <button onClick={() => this.deleteCharge(charge.id)} className="btn btn-danger margin-left-right-bis">Supprimer</button>
                                            </td>

                                            <Modal
                                                show={this.state.updateModalShow}
                                                onHide={updateModalClose}
                                                {...this.props}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        Modification de la charge
                                </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group as={Col} controlId="formGridRubriqueUpdated">
                                                            <Form.Label>Rubrique :</Form.Label>
                                                            <Form.Control required name="rubriqueUpdated" type="text" value={this.state.rubriqueUpdated}
                                                                autoComplete="off" onChange={this.chargeChange} placeholder="Saisir la rubrique" />
                                                        </Form.Group >
                                                        <Form.Group as={Col} controlId="formGridDesignationUpdated">
                                                            <Form.Label> Désignation :</Form.Label>
                                                            <Form.Control required name="designationUpdated" type="text" value={this.state.designationUpdated}
                                                                autoComplete="off" onChange={this.chargeChange} placeholder="Saisir la désignation" />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridCreditDisponibleUpdated">
                                                            <Form.Label> Somme :</Form.Label>
                                                            <Form.Control required name="creditDisponibleUpdated" type="number" value={this.state.creditDisponibleUpdated}
                                                                autoComplete="off" onChange={this.chargeChange} placeholder="Saisir la somme" />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" onClick={this.updateCharge}>Confirmer</Button>
                                                    <Button variant="secondary" onClick={updateModalClose}>Fermer</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ChargeComponent;