import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from '../Navigation/Navbar';

class BienvenueComponent extends Component {
    componentDidMount() {
        if (this.props.security.validToken) {
          this.props.history.push("/dashboard");
        }
    }
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
BienvenueComponent.propTypes = {
    security: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    security: state.security
  });
  
  export default connect(mapStateToProps)(BienvenueComponent);