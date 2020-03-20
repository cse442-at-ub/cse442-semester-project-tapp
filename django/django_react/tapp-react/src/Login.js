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
import { getStudents } from './actions/students';

export class LoginModal extends Component  {

    constructor(props) {
    super(props)
    this.state = {
            signedUp: false,
            signedValid: false,
            isLoading: false,
            loginAlertF: false,
            loginAlertS: false,
            onHide: props.onHide,
            show: props.show
    };

    this.toggleSignedUp = this.toggleSignedUp.bind(this);
    this.toggleSignedUpBool = this.toggleSignedUpBool.bind(this);
    this.toggleSignedValid = this.toggleSignedValid.bind(this);
    this.toggleIsLoading = this.toggleIsLoading.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoginAlertFail = this.toggleLoginAlertFail.bind(this);
    this.toggleLoginAlertSucc = this.toggleLoginAlertSucc.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {error, alert } = this.props;
    if(error != prevProps.error) {
     if(this.props.error.msg.email) {this.setState({emailValid: false,emailMessage: this.props.error.msg.email.join()})}
     else {this.state.emailValid=true;this.state.emailMessage=""}
     if(this.props.error.msg.password) {this.setState({passValid: false, passMessage: this.props.error.msg.pass.join()})}
     else {this.state.passValid=true;this.state.passMessage=""}
    }
  };
  
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

  toggleLoginAlertSucc = bool => {
    this.setState({
      loginAlertS: true
    });
  };

  toggleLoginAlertFail = bool => {
    this.setState({
      loginAlertF: true
    });
  };

  handleSubmit = event => {
	  const form = 
		  event.currentTarget;
	  if (form.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  else{
            event.preventDefault()
	    this.toggleSignedUp(true);
    	    this.props.getStudents();
            const res = this.props.students.filter(student => (student.email === form.elements.email.value));
	    if (res.length == 0){
	      this.toggleLoginAlertFail(false);
	    }
	    else {
	      this.toggleLoginAlertSucc(true);
	    }
	  }
	  this.toggleSignedValid(true);
  };

  render() {
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Alert variant="danger" show={this.state.loginAlertF} dismissible>
            <Alert.Heading> Login Failed </Alert.Heading>
          </Alert>
          <Alert variant="success" show={this.state.loginAlertS} dismissible>
            <Alert.Heading> Login Successfull </Alert.Heading>
          </Alert>
	<Form noValid onSubmit={this.handleSubmit} validated = {this.state.signedValid}>
	  <Form.Group controlId="formBasicEmail">
	    <Form.Label> E-mail </Form.Label>
	    <Form.Control name="email" type="email" placeholder="example@domain.com" required/>
	  </Form.Group>
	  <Form.Group controlId="formBasicPassword">
	    <Form.Label> Password </Form.Label>
	    <Form.Control name="password" type="password" placeholder="Password" required/>
	  </Form.Group>
	  <Button variant="primary" type="submit" disabled={this.state.isLoading}> {this.state.isLoading ? 'Loading...':'Submit'} </Button>
	</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
  }
}

LoginModal.propTypes = {
        students: PropTypes.array.isRequired,
        error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  students: state.students.students,
  error: state.errors
});

export default connect(mapStateToProps, {getStudents})(LoginModal);
