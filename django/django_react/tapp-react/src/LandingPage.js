import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row'

import Typist from 'react-typist';

import "./styles.css";

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
    return (
    <><div style={{background: "#596869"}} id="main">
    <TopBar login={this.toggleSign} signin={this.toggleLogin} />
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
    </div>
    </>
    )
  }
}

export default LandingPage;
