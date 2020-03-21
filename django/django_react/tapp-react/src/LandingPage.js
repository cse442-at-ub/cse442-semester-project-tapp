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
import TopBar from './topbar';

export class LandingPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      sign: false
    };
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSign = this.toggleSign.bind(this);
  }

  toggleLogin = () => {
    this.setState({
      login: !this.state.login
    });
  };

  toggleSign = () => {
    this.setState({
      sign: !this.state.sign
    });
  };

  render() { 
    const { login, sign } = this.state;
    
    return (
    <><TopBar login={this.toggleSign} signin={this.toggleLogin} />
    <div style={{background: "#596869"}} id="main">
    <Row className="align-middle justify-content-md-center"> 
    <Typist stdTypingDelay={0} cursor={{show:false, blink: true}}>
    <p className="text-center" style={{color:"#f5f9e9", fontSize:50, display:'inline-block'}}>
      The perfect solution for connecting instructors?
      <Typist.Delay ms={550} />
      <Typist.Backspace count={12} delay={100} />
      students? <Typist.Delay ms={550} />  
      <Typist.Backspace count={2} delay={100} /> with instructors.
    </p>
    </Typist>
    </Row>
    <Row className="justify-content-center"> 
    <Button onClick={this.toggleSign} variant="info outline-warning" size="lg"> Sign Up </Button>

    <SignupModal show={this.state.sign} onHide={this.toggleSign} />
    <LoginModal show={this.state.login} onHide={this.toggleLogin} />
    </Row>
    </div> </>
    )
  }
}

export default LandingPage;
