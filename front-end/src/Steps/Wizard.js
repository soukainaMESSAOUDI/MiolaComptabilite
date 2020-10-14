import React, { Component } from 'react';
import axios from 'axios';
import { Form, Col, Button, Row } from 'react-bootstrap';
import Stepper from "./Stepper"
import "./Wizard.css";

class Wizard extends Component {

    constructor() {
        super();

        this.state = {
            reference1: '',
            designation1: '',
            pourcentage1: '',

            reference2: '',
            designation2: '',
            pourcentage2: '',

            reference3: '',
            designation3: '',
            pourcentage3: '',

            reference4: '',
            designation4: '',
            pourcentage4: '',

            currentStep: 1,
            programmeActuel: '',
            pourcentageGlobal: 100,

            list: [],
        };

        this.partieChange = this.partieChange.bind(this);
        this.saveParties = this.saveParties.bind(this);
    }

    componentDidMount() {
        this.getProgrammeActuel();
    }

    saveParties(event) {
        event.preventDefault();

        if (this.state.pourcentage4 > this.state.pourcentageGlobal) {
            alert("Veuillez saisir un pourcentage inférieur ou égal à " + this.state.pourcentageGlobal);
        } else {
            this.state.pourcentageGlobal -= this.state.pourcentage4;
            console.log("le pourcentage restant est : " + this.state.pourcentageGlobal);
            axios.post("http://localhost:8080/save-all-parties", this.state.list)
                .then(response => {
                    if (response.data != null) {
                        console.log("List saved successfully");
                        this.props.history.push("/programme-actuel");
                    }
                })
        }
    }

    getProgrammeActuel() {
        axios.get("http://localhost:8080/programme-actuel")
            .then(response => {
                this.setState({ programmeActuel: response.data });
            });
    }

    partieChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick(clickType, percent) {
        const { currentStep } = this.state;
        let newStep = currentStep;

        if (clickType === "next" && percent <= this.state.pourcentageGlobal) {
            this.state.pourcentageGlobal -= percent;
            newStep++;
            console.log("pourcentages est " + this.state.pourcentageGlobal);

        } else if (clickType === "next" && percent > this.state.pourcentageGlobal) {
            newStep = currentStep;
            alert("Veuillez saisir un pourcentage inférieur ou égal à " + this.state.pourcentageGlobal);

        } else if (clickType === "previous") {
            this.state.pourcentageGlobal = parseInt(this.state.pourcentageGlobal) + parseInt(percent);
            newStep--;
            console.log("pourcentages est " + this.state.pourcentageGlobal);
        }

        if (newStep > 0 && newStep <= 5) {
            this.setState({
                currentStep: newStep
            });
        }
    }

    render() {
        const { currentStep } = this.state;
        const list = [
            { pourcentage: this.state.pourcentage1, reference: this.state.reference1, designation: 'Ensias' },
            { pourcentage: this.state.pourcentage2, reference: this.state.reference2, designation: 'Um5' },
            { pourcentage: this.state.pourcentage3, reference: this.state.reference3, designation: 'Vacations' },
            { pourcentage: this.state.pourcentage4, reference: this.state.reference4, designation: 'Charges' }
        ];
        this.state.list = list;
        const styleButton = { float: "right" };
        let view;
        if (currentStep === 1) {
            view =
                <div>
                    <Form id="addFormId1">
                        <Form.Group as={Col} controlId="formGridReference">
                            <Form.Label>Référence :</Form.Label>
                            <Form.Control required name="reference1" type="text" value={this.state.reference1}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir la référence" />
                        </Form.Group >
                        <Form.Group as={Col} controlId="formGridPourcentage">
                            <Form.Label>Pourcentage :</Form.Label>
                            <Form.Control required name="pourcentage1" type="number" value={this.state.pourcentage1}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir le pourcentage" />
                        </Form.Group>
                        <br />
                        <Row>
                            <Button onClick={() => this.handleClick("next", this.state.pourcentage1)} style={styleButton} variant="dark">Suivant</Button>
                        </Row>
                    </Form>
                </div>
        }
        else if (currentStep === 2) {
            view =
                <div>
                    <Form id="addFormId2">
                        <Form.Group as={Col} controlId="formGridReference">
                            <Form.Label>Référence :</Form.Label>
                            <Form.Control required name="reference2" type="text" value={this.state.reference2}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir la référence" />
                        </Form.Group >
                        <Form.Group as={Col} controlId="formGridPourcentage">
                            <Form.Label>Pourcentage :</Form.Label>
                            <Form.Control required name="pourcentage2" type="number" value={this.state.pourcentage2}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir le pourcentage" />
                        </Form.Group>
                    </Form>
                    <br />
                    <Button onClick={() => this.handleClick("previous", this.state.pourcentage1)} variant="dark">Précédent</Button>
                    <Button onClick={() => this.handleClick("next", this.state.pourcentage2)} style={styleButton} variant="dark">Suivant</Button>
                </div>
        }
        else if (currentStep === 3) {
            view =
                <div>
                    <Form id="addFormId3">
                        <Form.Group as={Col} controlId="formGridReference">
                            <Form.Label>Référence :</Form.Label>
                            <Form.Control required name="reference3" type="text" value={this.state.reference3}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir la référence" />
                        </Form.Group >
                        <Form.Group as={Col} controlId="formGridPourcentage">
                            <Form.Label>Pourcentage :</Form.Label>
                            <Form.Control required name="pourcentage3" type="number" value={this.state.pourcentage3}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir le pourcentage" />
                        </Form.Group>
                    </Form>
                    <br />
                    <Button onClick={() => this.handleClick("previous", this.state.pourcentage2)} variant="dark">Précédent</Button>
                    <Button onClick={() => this.handleClick("next", this.state.pourcentage3)} style={styleButton} variant="dark">Suivant</Button>
                </div>
        }
        else if (currentStep === 4) {
            view =
                <div>
                    <Form id="addFormId4">
                        <Form.Group as={Col} controlId="formGridReference">
                            <Form.Label>Référence :</Form.Label>
                            <Form.Control required name="reference4" type="text" value={this.state.reference4}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir la référence" />
                        </Form.Group >
                        <Form.Group as={Col} controlId="formGridPourcentage">
                            <Form.Label>Pourcentage :</Form.Label>
                            <Form.Control required name="pourcentage4" type="number" value={this.state.pourcentage4}
                                autoComplete="off" onChange={this.partieChange} placeholder="Saisir le pourcentage" />
                        </Form.Group>
                    </Form>
                    <br />
                    <Button onClick={() => this.handleClick("previous", this.state.pourcentage3)} variant="dark">Précédent</Button>
                    <Button variant="primary" onClick={this.saveParties} style={styleButton}> Enregistrer </Button>
                </div>
        }
        return (
            <>
                <h3>CRÉATION D'UN NOUVEAU PROGRAMME D'EMPLOI</h3>
                <div className="stepper-container-horizontal">
                    <Stepper steps={stepArray} currentStepNumber={currentStep - 1} />
                    <br />
                    {view}
                </div>
            </>
        );
    }
}

const stepArray = [
    "Ensias",
    "Um5",
    "Vacations",
    "Charges",
];

export default Wizard;