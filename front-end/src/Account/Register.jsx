import React, { Component } from "react";
import { createNewUser } from "../Actions/securityAction";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Mybar from "../Navigation/Mybar";
import './Register.css'

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <>
        <Mybar />
        <div class="form-register">
          <h4 style={{ marginBottom: "30px", fontFamily: "Roboto" }}>Inscrivez-vous</h4>

          <Form onSubmit={this.onSubmit}>

            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.fullName
              })}
              placeholder="Nom complet"
              name="fullName"
              value={this.state.fullName}
              onChange={this.onChange}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}

            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.username
              })}
              placeholder="Email"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}

            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              placeholder="Mot de passe"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}


            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.confirmPassword
              })}
              placeholder="Confirmer mot de passe"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword}
              </div>
            )}
            <input type="submit" className="btn btn-dark btn-lg" value="Inscription" />
            <p class="message">Déjà inscrit ? <a href="/login"> Connectez-vous</a></p>
          </Form>
        </div>
      </>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);