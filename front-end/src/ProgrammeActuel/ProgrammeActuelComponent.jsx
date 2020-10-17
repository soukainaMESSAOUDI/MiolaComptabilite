import React, { Component } from 'react';
import { Container, Card, ButtonGroup, Button, Modal, Form, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

class ProgrammeActuelComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            programmeActuel: '',
            parties: [],
            updateModalShow1: false,
            updateModalShow2: false,
            index: '',
            reference: '',
            pourcentage: '',
        };

        this.partieChange = this.partieChange.bind(this);
        this.updatePartie = this.updatePartie.bind(this);

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

    updatePartie(event) {
        event.preventDefault();

        const partie = { reference: this.state.reference, pourcentage: this.state.pourcentage };
        const id = this.state.index;
        console.log(id);
        axios.put("http://localhost:8080/parties/" + id, partie)
            .then(response => {
                if (response.data != null) {
                    this.setState({ updateModalShow1: false });
                }
            });
        window.location.reload(false);
    }

    deletePartie(partieId) {
        console.log(partieId);
        axios.delete("http://localhost:8080/parties/" + partieId)
            .then(response => {
                if (response.data != null) {
                    alert("Successfully deleted");
                    this.setState({
                        parties: this.state.parties.filter(partie => partie.id !== partieId)
                    });
                }
            });
    }

    partieChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        let updateModalClose1 = () => this.setState({ updateModalShow1: false });
        let updateModalClose2 = () => this.setState({ updateModalShow2: false });

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
                            onClick={() => {
                                this.setState({
                                    updateModalShow2: true,
                                    selectedPartie: partie,
                                })
                            }}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>

                        <Button className="btn btn-success btn-sm btn-group-link"
                            onClick={() => {
                                this.setState({
                                    updateModalShow1: true,
                                    index: parseInt(partie.id),
                                    reference: partie.reference,
                                    pourcentage: partie.pourcentage,
                                })
                            }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        <Button size="sm" variant="danger btn-group-link"
                            onClick={this.deletePartie.bind(this, partie.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>

                    </ButtonGroup>
                </td>

                <Modal
                    show={this.state.updateModalShow1}
                    onHide={updateModalClose1}
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Modification de la partie
                                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Col} controlId="formGridReference">
                                <Form.Label>Référence :</Form.Label>
                                <Form.Control required name="reference" type="text" value={this.state.reference}
                                    autoComplete="off" onChange={this.partieChange} placeholder="Saisir la référence" />
                            </Form.Group >
                            <Form.Group as={Col} controlId="formGridPourcentage">
                                <Form.Label>Pourcentage :</Form.Label>
                                <Form.Control required name="pourcentage" type="number" value={this.state.pourcentage}
                                    autoComplete="off" onChange={this.partieChange} placeholder="Saisir le pourcentage" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.updatePartie}>Confirmer</Button>
                        <Button variant="secondary" onClick={updateModalClose1}>Fermer</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.updateModalShow2}
                    onHide={updateModalClose2}
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Détails
                                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <li>  Référence : {partie.reference} </li>
                        <br />
                        <li>  Désignation : {partie.designation} </li>
                        <br />
                        <li>  Pourcentage : {partie.pourcentage} </li>
                        <br />
                        <li>   Somme : {partie.somme} </li>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={updateModalClose2}>Fermer</Button>
                    </Modal.Footer>
                </Modal >
            </tr >
        );
        return (
            <div className="container">
                <Container>
                    <br />
                    {/*   <h3>PROGRAMME D'EMPLOI  {programme.annee} </h3> */}
                    <Card >
                        <Card.Body>
                            <Image className="ensias" src="/Images/ensias.png" />
                            <br />
                            <br />
                            <h6 style={{ textAlign: "center" }}>  Université Mohammed V de Rabat </h6>
                            <h5 style={{ textAlign: "center" }}>Ecole Nationale Supérieure d’Informatique et d’Analyse des Systèmes </h5>
                            <br />
                            <Card.Title>PE FORMATION DES FONCTIONNAIRES ET DES SALARIES EN
                            Master Internet des Objets : Logiciel et Analytique</Card.Title>
                            <Card.Text>
                            <br />
                                <li>  Année universitaire : {programme.annee} </li>
                                <br />
                                <li>  Nombre des  étudiants inscrits : {programme.nombreInscrit} </li>
                                <br />
                                <li>  Coût de la formation Miola : {programme.coutFormation} </li>
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