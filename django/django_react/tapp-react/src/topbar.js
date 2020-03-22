import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

export class TopBar extends Component{
  render() { 
    return (
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
    )
}
}

export default (TopBar);
