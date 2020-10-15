import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Image } from 'react-bootstrap';
import { connect } from "react-redux";
import { logout } from "../Actions/securityAction";
import "../Navigation/Navbar.css";
import Navbar from "../Navigation/Navbar"
import { IconContext } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.logout(this);
    }
  }
  
  render() {
     const { validToken, user } = this.props.security;

  const userIsAuthenticated = (
      <div className="o">
         <IconContext.Provider value={{ color: '#FFFFFF' }}>
         <div className="navbar">
                    <Link to={"#"} className="menu-bars">
                        <Image className="logo" src="/Images/logo.png" />
                    </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-user-circle mr-1" />
              {user.fullName}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
        </div>
        </IconContext.Provider>
      </div>

    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
     }
    //  else {
    //   headerLinks = userIsNotAuthenticated;
    // }

    return (
     
        <div className="container">
       {/* <IconContext.Provider value={{ color: '#fff' }}>
          <Link className="navbar-brand" to="/">
          </Link>
       <button
           className="navbar-toggler"
           type="button"
           data-toggle="collapse"
           data-target="#mobile-nav"
         >
         <span className="navbar-toggler-icon" />
      </button>
        {headerLinks}
     </IconContext.Provider> */}
        </div>
    );
  }
}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);