import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

class TableParties extends Component {

    constructor() {
        super();
        this.state = {
            parties: [],
        }
    }

    getParties() {
        axios.get("http://localhost:8080/parties")
            .then(response => response.data)
            .then((data) => {
                this.setState({ parties: data });
            })
    }

    componentDidMount() {
        this.getParties();
    }

    render() {
        const tableRows = this.state.parties.map((partie) =>
            <tr key={partie.id}>
                <td>{partie.reference}</td>
                <td>{partie.designation}</td>
                <td>{partie.pourcentage}</td>
                <td>{partie.somme}</td>
            </tr>);
        return (
            <div>
                <br />
                <h5 style={{ textAlign: "center", color: "grey" }}>Répartition du programme d'emploi actuel</h5>
                <Table style={{ width: "500px", height: "400px", marginTop: "50px" }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Référence</th>
                            <th>Désignation</th>
                            <th>Pourcentage</th>
                            <th>Somme</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableParties;