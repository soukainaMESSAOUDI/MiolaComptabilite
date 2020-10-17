import React, { Component } from 'react';
import axios from 'axios';
import ChargeComponent from './ChargeComponent';
import Navbar from '../Navigation/Navbar';
import { Container, Button, Modal, Form, Col, Table, Row } from 'react-bootstrap';



class ListCharge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parties: [],
            charges: [],
            rubrique: '',
            designation: '',
            creditDisponible: '',
            hidden: true,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/all-charges").then((res) => {
            this.setState({ parties: res.data });

        });
    }

    ChargeList = () => {
        this.props.history.push('/charges');
    }
    render() {
        return (
            <div>
                <Navbar />
                <h3>Liste des Charges</h3>
                <Container> <div className="row">
                    <Row>
                        <Button size="sm" variant="btn btn-success" onClick={this.ChargeList} style={{ marginBottom: "20px", height: "50px" }} block>
                            Consulter les charges de l'annee actuelle
                    </Button>
                    </Row>

                    <Table class=" margin-top-bottom margin-left-right" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Annee</th>
                                <th>Somme</th>
                                <th>Reste</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.parties.map(
                                partie =>
                                    <tr key={partie.id}>

                                     {/*   <tr key={partie.id} onClick={this.ChargeList} className="row1"> */}
                                            <td>{partie.annee}</td>
                                            <td>{partie.somme}</td>
                                            <td>{partie.reste}</td>
                                        </tr>
                            )}
                        </tbody>

                    </Table>

                </div>
                </Container>
            </div>
        );
    }
}

export default ListCharge;