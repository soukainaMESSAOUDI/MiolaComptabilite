import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navigation/Navbar'
import BienvenueComponent from './Dashboard/BienvenueComponent';
import ListBudgetComponent from './Budgets/ListBudgetComponent';
import ProgrammeActuel from './ProgrammeActuel/ProgrammeActuel';
import Wizard from './Steps/Wizard';

import ProgrammeComponent from './Components/ProgrammeComponent';
import Step1Component from './Components/Step1Component';

import Professeur from './Vacations/Professeur';
import ProfesseurList from './Vacations/ProfesseurList';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={BienvenueComponent} />
          <Route path="/dashboard" exact component={BienvenueComponent} />
          <Route path="/budgets" component={ListBudgetComponent}></Route>
          <Route path="/programme-actuel" exact component={ProgrammeActuel} />
          <Route path="/wizard" exact component={Wizard} />

          <Route path="/programmes" exact component={ProgrammeComponent} />
          <Route path="/add1" exact component={Step1Component} />
          <Route path="/vacations" exact component={Professeur}/>
          <Route path="/Professeurs" exact component={ProfesseurList}/>

        </Switch>
      </Router>
    </>
  );
}

export default App;
