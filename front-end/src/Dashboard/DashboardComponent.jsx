import React, { Component } from 'react';
import axios from 'axios';
import ChartPartiesComponent from './ChartPartiesComponent';
import { Row, Card, CardDeck } from 'react-bootstrap';
import ChartChargesComponent from './ChartChargesComponent';
import Navbar from "../Navigation/Navbar";

class DashboardComponent extends Component {

    constructor() {
        super();
        this.state = {
            programmeActuel: '',
            chartData: {},
        }
    }

    componentDidMount() {
        this.getProgrammeActuel();
    }

    componentWillMount() {
        this.getChartData();
    }

    getProgrammeActuel() {
        axios.get("http://localhost:8080/programme-actuel")
            .then(response => {
                this.setState({ programmeActuel: response.data });
                console.log("Programme annee :" + this.state.programmeActuel.annee);
            });
    }

    getChartData() {

        let listD = [];
        let listS = [];

        axios.get("http://localhost:8080/parties")
            .then(response => {
                for (const dataObj of response.data) {
                    listD.push(dataObj.designation);
                    listS.push(dataObj.somme);
                }
                console.log("this is d " + listD);
                console.log("this is s " + listS);
            })

        this.setState({
            chartData: {
                labels: listD,
                datasets: [
                    {
                        label: 'Somme',
                        data: listS,
                        backgroundColor: [
                            '#f3bbbf',
                            '#a8d3fa',
                            '#1da0b5',
                            '#6b757f',
                            '#b1aeac',
                            '#2da63f',
                            '#de3542',
                            '#0069d9',
                            '#ffff99',
                            '#8cd9b3',
                            '#ff9999',
                            '#99ddff',
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div >
                <Navbar/>
                <h3>Tableau de bord</h3>
                <div className="container">
                    <CardDeck>
                        <Card >
                            <Card.Header style={{ backgroundColor: '#99ddff' }}>Année actuelle :</Card.Header>
                            <Card.Body style={{ backgroundColor: '#e6f7ff' }}>
                                {this.state.programmeActuel.annee}
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header style={{ backgroundColor: '#18a1b7' }}>Nombre d'inscrits : </Card.Header>
                            <Card.Body style={{ backgroundColor: '#6bb4c4' }}>
                                {this.state.programmeActuel.nombreInscrit} Étudiants
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header style={{ backgroundColor: '#969ba1' }}>Coût de formation : </Card.Header>
                            <Card.Body style={{ backgroundColor: '#ccd0d5' }}>

                                {this.state.programmeActuel.coutFormation} DH
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header style={{ backgroundColor: '#ff9999' }}>Budget annuel :</Card.Header>
                            <Card.Body style={{ backgroundColor: '#ffcccc' }}>
                                {this.state.programmeActuel.budget} DH
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br />
                    <Row>
                        <ChartPartiesComponent chartData={this.state.chartData} legendPosition="bottom" />
                    </Row>
                    <br />
                    {/*
                    <Table title="Vacations des professeurs" className="table-dashboard" striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Professeur</th>
                                <th>Grade</th>
                                <th>Nombre de modules</th>
                                <th>Tarif</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Ahmed</td>
                                <td>PA</td>
                                <td>3</td>
                                <td>4000</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Mohamed</td>
                                <td>PH</td>
                                <td>6</td>
                                <td>5000</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Sara</td>
                                <td>PES</td>
                                <td>6</td>
                                <td>6000</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Zakha</td>
                                <td>PES</td>
                                <td>6</td>
                                <td>6000</td>
                            </tr>
                        </tbody>
                    </Table>
                  */}

                    <ChartChargesComponent chartData={this.state.chartData} legendPosition="bottom" />
                </div>

            </div>
        );
    }
}

export default DashboardComponent;