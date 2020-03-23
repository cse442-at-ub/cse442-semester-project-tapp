import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from './actions/students';
import { login } from './actions/auth';
import { Link, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


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
	    passValid: false,
	    nameValid: false,
	    courseValid: false,
	    emailMessage: "Please enter an email!",
	    nameMessage: "",
	    courseMessage: "",
            show: props.show
    };

    this.toggleSignedUp = this.toggleSignedUp.bind(this);
    this.toggleSignedUpBool = this.toggleSignedUpBool.bind(this);
    this.toggleSignedValid = this.toggleSignedValid.bind(this);
    this.toggleIsLoading = this.toggleIsLoading.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoginAlertFail = this.toggleLoginAlertFail.bind(this);
    this.toggleLoginAlertSucc = this.toggleLoginAlertSucc.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {error, alert} = this.props;
    var x;
    if(error !== prevProps.error) {
     if(this.props.error.msg.email) {this.setState({emailValid: false,emailMessage: this.props.error.msg.email.join()})}
     if(this.props.error.msg.non_field_errors) {
	     for (x in this.props.error.msg.non_field_errors)
	     {
	       if (this.props.error.msg.non_field_errors[x] == 'Invalid password.'){
                this.setState({passValid: false, passMessage:this.props.error.msg.non_field_errors[x]})}
     	     }}
     else {this.setState({emailValid: true,emailMessage: ""})}
     if(this.props.error.msg.password) {this.setState({passValid: false, passMessage: this.props.error.msg.pass.join()})}
     else {this.setState({passValid:true,passMessage:""})}
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
            this.setState({passValid: true, passMessage:""})
	    this.toggleSignedUp(true);
	    this.props.login(form.elements.email.value, form.elements.password.value);
	    if(!this.props.isAuth && !this.props.isLoad) {
	      this.toggleLoginAlertFail(true);
	    }
	  }
	  if (this.checkValidity() === true)
          {
	    this.toggleSignedUp();
	    this.toggleSignedValid(true);
	  }
  };

  checkValidity = () => {
    //return this.state.emailValid && this.state.nameValid && this.state.passValid;};
    return this.state.emailValid && this.state.passValid};

  render() {
    if (this.props.isAuth) {
      return <Redirect to="/dashboard" />;
    }
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Alert variant="danger" show={this.props.isAuth} dismissible>
            <Alert.Heading> Login Failed </Alert.Heading>
          </Alert>
          <Alert variant="success" show={this.state.loginAlertS} dismissible>
            <Alert.Heading> Login Successfull </Alert.Heading>
          </Alert>
          <Form onSubmit={this.handleSubmit} validated={this.checkValidity()}>
	  <Form.Group controlId="formBasicEmail">
	    <Form.Label> E-mail </Form.Label>
	    <Form.Control name="email" type="email" placeholder="example@domain.com" required/>
            <Form.Control.Feedback type="invalid"> {this.state.emailMessage} </Form.Control.Feedback> 
	  </Form.Group>
	  <Form.Group controlId="formBasicPassword">
	    <Form.Label> Password </Form.Label>
	    <Form.Control name="password" type="password" placeholder="Password" required/>
            <Form.Control.Feedback type="invalid"> {this.state.passMessage} </Form.Control.Feedback> 
	  </Form.Group>
	  <Button variant="primary" type="submit" disabled={this.props.isLoad}> {this.props.isLoad ? 'Loading...':'Submit'} </Button>
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
        login: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        isAuth: PropTypes.bool,
        error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  students: state.students.students,
  isLoad: state.auth.isLoading,
  isAuth: state.auth.isAuthenticated,
  error: state.errors
});

export default connect(mapStateToProps, {login})(LoginModal);
