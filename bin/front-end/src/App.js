import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navigation/Navbar'
import ListBudgetComponent from './Budgets/ListBudgetComponent';
import ProgrammeActuel from './ProgrammeActuel/ProgrammeActuel';
import Wizard from './Steps/Wizard';
import DashboardComponent from './Dashboard/DashboardComponent'
import ProgrammeComponent from './Components/ProgrammeComponent';
import Step1Component from './Components/Step1Component';
import ChargeComponent from './Charges/ChargeComponent';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={DashboardComponent} />
          <Route path="/dashboard" exact component={DashboardComponent} />
          <Route path="/nouveau-PE" component={ListBudgetComponent}></Route>
          <Route path="/programme-actuel" exact component={ProgrammeActuel} />
          <Route path="/wizard" exact component={Wizard} />

          <Route path="/charges" exact component={ChargeComponent} />
          <Route path="/programmes" exact component={ProgrammeComponent} />
          <Route path="/add1" exact component={Step1Component} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
