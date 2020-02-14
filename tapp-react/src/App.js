import React from 'react';
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

function SignupModal(props) {
  const [signedUp, setSignedUp] = React.useState(false)
  const [signedValid, setSignedValid] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  const handleSubmit = event => {
	  const form = 
		  event.currentTarget;
	  if (form.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  else{
	  setSignedUp(true);
	  setLoading(true);
	  }
	  setSignedValid(true);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Signup </Modal.Title>
      </Modal.Header>
      <Modal.Body>
	<Alert variant="success" show={signedUp} onClose={()=>setSignedUp(false)} dismissible>
	  <Alert.Heading> An email verification has been sent to your email </Alert.Heading>
	</Alert>
	<Form noValidate validated = {signedValid} onSubmit = {handleSubmit}>
	  <Form.Group controlId="formBasicEmail">
	    <Form.Label> Name </Form.Label>
	    <Form.Control type="email" placeholder="example@domain.com" required />
	    <Form.Control.Feedback type="invalid"> Please enter a valid email! </Form.Control.Feedback> 
	  </Form.Group>
	  <Form.Group controlId="formBasicPassword">
	    <Form.Label> Password </Form.Label>
	    <Form.Control type="password" placeholder="Password" required/>
	    <Form.Control.Feedback type="invalid"> Please enter a password! </Form.Control.Feedback> 
	  </Form.Group>
	  <Form.Group controlId="formBasicText">
	    <Form.Label> Name </Form.Label>
	    <Form.Control type="text" placeholder="Name" required/>
	    <Form.Control.Feedback type="invalid"> Please enter a Name! </Form.Control.Feedback> 
	  </Form.Group>
	  <Form.Group controlId="formBasicText">
	    <Form.Label> Course </Form.Label>
	    <Form.Control type="text" placeholder="Course" required/>
	    <Form.Control.Feedback type="invalid"> Please enter a Course Name! </Form.Control.Feedback> 
	  </Form.Group>
	  <Button variant="primary" type="submit" disabled={isLoading}> {isLoading ? 'Loading...':'Submit'} </Button>
	</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
}

function LoginModal(props) {
  const [signedUp, setSignedUp] = React.useState(false)
  const [signedValid, setSignedValid] = React.useState(false)
  const handleSubmit = event => {
	  const form = 
		  event.currentTarget;
	  if (form.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  setSignedValid(true);
  };
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
	<Form noValid validated={handleSubmit}>
	  <Form.Group controlId="formBasicEmail">
	    <Form.Label> Name </Form.Label>
	    <Form.Control type="email" placeholder="example@domain.com" required/>
	  </Form.Group>
	  <Form.Group controlId="formBasicPassword">
	    <Form.Label> Password </Form.Label>
	    <Form.Control type="password" placeholder="Password" required/>
	  </Form.Group>
	  <Button variant="primary"> Submit </Button>
	</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [login, setLogin] = React.useState(false);
  const [sign, setSign] = React.useState(false);

  const toggleLogin = () => setLogin(!login);
  const toggleSign = () => setSign(!sign);
  return ( 
    <div style={{background: "#596869"}} id="main">
    <Row>
    <Navbar style={{backgroundColor: '#36453b'}} variant="dark" expand="lg" fixed="top" fluid>
      <Navbar.Brand>Tapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="response-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
          <Button variant="info" className="mx-2 ml-md-0" onClick={toggleLogin} > Login </Button>
          <Button variant="info" className="mx-2 ml-md-0" onClick={toggleSign}> Register </Button>
          <Button variant="info" className="ml-2 ml-md-0"> Gamer </Button>
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
    <Button onClick={toggleSign} variant="info outline-warning" size="lg"> Sign Up </Button>

    <SignupModal show={sign} onHide={toggleSign} />
    <LoginModal show={login} onHide={toggleLogin} />

    </Row>
    </div>
  )
}

export default App;
