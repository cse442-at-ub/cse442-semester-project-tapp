import React, { Component, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import store from './store'
import { createStore } from "redux";
import reducer from "./reducers/students.js";
import TopBar from './topbar';
import LandingPage from './LandingPage.js';

export class App extends Component{
  constructor(props) {
    super(props);
  }

  render() { 
    return (
	<LandingPage />
    );
  }
}

export default (App);
