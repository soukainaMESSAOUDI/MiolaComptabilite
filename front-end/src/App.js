import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mybar from './Navigation/Navbar';
import BienvenueComponent from './Dashboard/BienvenueComponent';
import ListBudgetComponent from './Budgets/ListBudgetComponent';
import ProgrammeActuel from './ProgrammeActuel/ProgrammeActuel';
import Welcome from './Account/Welcome';
import Login from './Account/Login';
import Header from './Account/Header';
import Register from './Account/Register';
import Wizard from './Steps/Wizard';
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./SecurityUtils/SetJWTToken";
import { SET_CURRENT_USER } from "./Actions/types";
import { logout } from "./Actions/securityAction";
import SecuredRoute from "./SecurityUtils/SecureRoute";

import ProgrammeComponent from './Components/ProgrammeComponent';
import Step1Component from './Components/Step1Component';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
            {
              //Public Routes
            }


            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {
              //private routes
            }

          
          <Switch>
          <SecuredRoute path="/dashboard" exact component={BienvenueComponent} />
          <SecuredRoute path="/budgets" component={ListBudgetComponent}/>
          <SecuredRoute path="/programme-actuel" exact component={ProgrammeActuel} />
          <SecuredRoute path="/wizard" exact component={Wizard} />
          <SecuredRoute path="/programmes" exact component={ProgrammeComponent} />
          <SecuredRoute path="/logout" exact component={Header} />
          </Switch>
          </div>
      </Router>
      </Provider>
  );
}

export default App;
