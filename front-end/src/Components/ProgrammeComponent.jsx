import React, { Component } from 'react';
import axios from 'axios';
import { ButtonGroup, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class ProgrammeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programmes: []
        };
    }

    componentDidMount() {
        this.getAllProgramme();
    }

    getAllProgramme() {
        axios.get("http://localhost:8080/all-programmes")
            .then(response => response.data)
            .then((data) => {
                this.setState({ programmes: data });
            })
    }

    updatePartie(partieId) {
        console.log(partieId);
        axios.put("http://localhost:8080/parties/" + partieId)
            .then(response => {
                if (response.data != null) {
                    alert("Partie supprimee avec succees");
                    this.setState({
                        parties: this.state.parties.filter(partie => partie.id !== partieId),
                    });
                }
            });
    }
    deletePartie(partieId) {
        axios.delete("http://localhost:8080/parties/" + partieId)
            .then(response => {
                if (response.data != null) {
                    alert("Partie supprimee avec succees");
                    this.setState({
                        parties: this.state.parties.filter(partie => partie.id !== partieId),
                    });
                }
            });
    }


    render() {
        const tableRows = this.state.programmes.map((programme, index) =>
            <tr key={index}>
                <td>{programme.id}</td>
                <td>{programme.annee}</td>
                <td>{programme.nombreInscrit}</td>
                <td>{programme.coutFormation}</td>
                <td>{programme.budget}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" variant="outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>{''}
                    </ButtonGroup>
                </td>
            </tr>
        );

        return (
            <Container>

                <div className="tableProgramme">
                    <h2 className="text-center"> Programme d'emploi de Miola</h2>
                    <div className="row">
                        <table className="table table-striped table-bordered table-hover"  >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Annee</th>
                                    <th>Nombre des inscrits</th>
                                    <th>Cout de formation</th>
                                    <th>Budget</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ProgrammeComponent;