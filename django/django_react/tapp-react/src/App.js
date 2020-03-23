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
import PRoute from './Proute.js';
import {loadCustomUser} from './actions/auth';

export class App extends Component{
  componentDidMount() {
    this.props.store.dispatch(loadCustomUser());
  }

  render() { 
    return (
	<>
	<Router>
	<Switch>
          <Route exact path="/">
	  <LandingPage />
          </Route>
          <Route exact path="/dashboard" component={Dashboard} >
            <Dashboard />
          </Route>
        </Switch>
	</Router>
	</>
    );
  }
}

export default (App);
