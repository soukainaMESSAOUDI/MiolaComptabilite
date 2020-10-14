import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class ChargeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parties: [],
        };
    }

    componentDidMount() {
        this.getParties();
    }

    getParties() {
        axios.get("http://localhost:8080/parties")
            .then(response => response.data)
            .then((data) => {
                this.setState({ parties: data });
            })
    }

    render() {
        const items = this.state.parties.map((partie) =>
            <option key={partie.id}> {partie.designation} : {partie.somme}  </option>
        );

        return (
            <div>
                <h3>GESTION DES CHARGES</h3>
                <div className="container" >
                    <Form  >
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Sélectionner une partie :</Form.Label>
                            <Form.Control as="select" custom>
                                {items}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ChargeComponent;