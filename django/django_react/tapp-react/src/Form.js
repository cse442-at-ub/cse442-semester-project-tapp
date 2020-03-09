import React, { Component, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { addUser } from './actions/students';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import typist from 'react-typist';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

import { connect } from 'react-redux';

import store from './store'
import { createstore } from "redux";
import reducer from "./reducers/students.js";


class SignupModal extends Component {
    constructor(props) {
    super(props)
    this.state = {
            name: "",
            email: "",
            password: "",
            course: "" ,
            signedUp: false,
            signedValid: false,
            isLoading: false,
            onHide: props.onHide,
            show: props.show
    };
    this.toggleSignedUp = this.toggleSignedUp.bind(this);
    this.toggleSignedUpBool = this.toggleSignedUpBool.bind(this);
    this.toggleSignedValid = this.toggleSignedValid.bind(this);
    this.toggleIsLoading = this.toggleIsLoading.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSignedUp = () => {
    this.setState({
      signedUp: !this.state.signedUp
    });
  };

  toggleSignedUpBool = bool => {
    this.setState({
      signedUp: bool
    });
  };

  toggleSignedValid = () => {
    this.setState({
      signedValid: !this.state.signedValid
    });
  };

  toggleIsLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };


  handleSubmit = event => {
	  const form = event.currentTarget;
	  if (form.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  else{
            event.preventDefault();
	    this.toggleIsLoading();
	    const name = form.elements.name.value;
	    console.log(name);
	    const email = form.elements.email.value;
	    console.log(email);
	    const pass = form.elements.password.value;
	    const course = form.elements.course.value;
	    const user = {name, email, course};
	    this.props.addUser(user);
	    this.toggleSignedUp();
	  }
	  this.toggleSignedValid(true);
  };

  render() {
    const signedUp = this.state.signedUp;
    const isLoading = this.state.isLoading;
    return (
      <Modal onHide= {this.props.onHide} show= {this.props.show} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title> Signup </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" show={signedUp} dismissible>
            <Alert.Heading> An email verification has been sent to your email </Alert.Heading>
          </Alert>
          <Form onSubmit={this.handleSubmit} validated={this.state.signedValid}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label> E-mail </Form.Label>
              <Form.Control type="email" name="email" placeholder="example@domain.com" required />
              <Form.Control.Feedback type="invalid"> Please enter a valid email! </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid"> Please enter a password! </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label> Name </Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" required/>
              <Form.Control.Feedback type="invalid"> Please enter a Name! </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label> Course </Form.Label>
              <Form.Control type="text" name="course" placeholder="Course" required/>
              <Form.Control.Feedback type="invalid"> Please enter a Course Name! </Form.Control.Feedback> 
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}> {isLoading ? 'Loading...':'Submit'} </Button>
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

SignupModal.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(null, { addUser }) (SignupModal);
