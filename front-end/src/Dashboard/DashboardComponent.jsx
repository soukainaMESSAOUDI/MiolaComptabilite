import React, { Component } from 'react';
import axios from 'axios';
import ChartPartiesComponent from './ChartPartiesComponent';
import { Row, Card, CardDeck } from 'react-bootstrap';
import ChartChargesComponent from './ChartChargesComponent';
import TableParties from './TableParties';
import Navbar from "../Navigation/Navbar";

class DashboardComponent extends Component {

    constructor() {
        super();
        this.state = {
            programmeActuel: '',
            sommeGlobale: '',
            partie: '',
            chartData: {},
            chartData2: {},
        }
    }

    componentWillMount() {
        this.getPartieCharge();
        this.getProgrammeActuel();
        this.getChartData();
        this.getChartData2();
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
                        ]
                    }
                ]
            }
        });
    }

    getPartieCharge() {
        axios.get("http://localhost:8080/charge/partie")
            .then(response => {
                this.setState({ partie: response.data, sommeGlobale: response.data.somme });
                console.log("voila la somme" + this.state.partie.somme + " et " + this.state.sommeGlobale);
            });
    }

    getChartData2() {
        let listS = [];
        let listD = [];

        axios.get("http://localhost:8080/charges")
            .then(response => {
                for (const dataObj of response.data) {
                    listD.push(dataObj.designation);
                    listS.push(dataObj.creditDisponible);
                }
                console.log("this is d2 " + listD);
                console.log("this is s2 somme" + listS);
            })

        this.setState({
            chartData2: {
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
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div >
                <Navbar />
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
                    <br />
                    <Row>
                        <ChartPartiesComponent chartData={this.state.chartData} legendPosition="bottom" />
                        <TableParties />

                    </Row>
                    <br />
                    <ChartChargesComponent chartData={this.state.chartData2} legendPosition="bottom" />
                </div>

            </div>
        );
    }
}

export default DashboardComponent;