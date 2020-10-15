import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { logout } from "../Actions/securityAction";

class NavigationBarComponent extends Component {
     logout() {
    this.props.logout();
    window.location.href = "/";
  }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={"dashboard"} className="nav-link">
                    Bienvenue
                </Link>
                <Link to={"programmes"} className="nav-link">
                    Programme
                </Link>
                <Link to={"add1"} className="nav-link">
                    Step1
                </Link>
                <Link to={"add2"} className="nav-link">
                    Step2
                </Link>
                <Link to={"add3"} className="nav-link">
                    Step3
                </Link>
                <Link to={"delete"} className="nav-link">
                    Delete
                </Link>
                
                

            </Navbar>
        );
    }
}

// export default NavigationBarComponent;
const mapStateToProps = state => ({
 
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);