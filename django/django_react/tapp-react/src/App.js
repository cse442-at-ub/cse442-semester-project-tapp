import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles.css";
import LandingPage from './LandingPage.js';
import Dashboard from './Dashboard.js';

export class App extends Component{
  render() { 
    return (
	<>
	<Router>
	<Switch>
          <Route exact path="/">
	  <LandingPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
         </Route>
        </Switch>
	</Router>
	</>
    );
  }
}

export default (App);
