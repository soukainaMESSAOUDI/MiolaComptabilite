import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';


class BienvenueComponent extends Component {
    render() {
        return (
            <Jumbotron className="text-black">
                <h1> Bienvenue dans Miola Comptabilite</h1>
                <blockquote className="blockquote mb-0">
                    <p>
                        Pour mieux gerer les depenses miolistes !
                    </p>
                    <footer className="blockquote-footer">
                        Master Miola
                    </footer>
                </blockquote>
            </Jumbotron>
        );
    }
}

export default BienvenueComponent;