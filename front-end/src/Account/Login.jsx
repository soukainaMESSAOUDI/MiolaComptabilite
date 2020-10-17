import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../Actions/securityAction";
import Mybar from "../Navigation/Mybar";
import { Form } from "react-bootstrap";
import './Login.css'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <>
        <Mybar />
        <div class="form-login">

          <h4 style={{ marginBottom: "30px", fontFamily: "Roboto" }}>Connectez-vous</h4>
          <Form onSubmit={this.onSubmit} className="login-form">
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

            <input type="submit" className="btn btn-dark btn-lg" value="Connexion" />

            <p class="message">Vous n'êtes pas inscrit ? <a href="/register">Inscrivez-vous maintenant</a></p>
          </Form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);