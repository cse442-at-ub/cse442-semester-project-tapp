import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import Typist from 'react-typist';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

function App() {
return ( 
  <div style={{background: "#596869"}} id="main">
  <Row>
  <Navbar style={{backgroundColor: '#36453b'}} variant="dark" expand="lg" fixed="top" fluid>
    <Navbar.Brand href="#home">Tapp</Navbar.Brand>
    <Navbar.Toggle aria-controls="response-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
        <Button variant="outline-warning" className="mx-2 ml-md-0"> Login </Button>
        <Button variant="outline-warning" className="mx-2 ml-md-0"> Register </Button>
        <Button variant="outline-warning" className="ml-2 ml-md-0"> Game </Button>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  </Row>
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
  <Button variant="info outline-warning" size="lg"> Sign Up </Button>
  </Row>
  </div>
)
}

export default App;
