import React, { Component, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import Typist from 'react-typist';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

import { Provider } from 'react-redux';
import { useDispatch, useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudents } from './actions/students';

import store from './store'
import { createStore } from "redux";
import reducer from "./reducers/students.js";
import SignupModal from './Form';
import LoginModal from './Login';

export class TopBar extends Component{
  constructor(props) {
    super(props);
  }

  render() { 
    return (
    <Row>
    <Navbar style={{backgroundColor: '#36453b'}} variant="dark" expand="lg" fixed="top" fluid>
      <Navbar.Brand>Tapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="response-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
          <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.login} > Login </Button>
          <Button variant="info" className="mx-2 ml-md-0" onClick={this.props.signin}> Register </Button>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Row>
    )
}
}

export default (TopBar);
