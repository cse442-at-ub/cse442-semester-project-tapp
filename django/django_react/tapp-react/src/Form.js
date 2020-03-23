import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { addUser } from './actions/students';
import { register } from './actions/auth';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

export class SignupModal extends Component {
    constructor(props) {
    super(props)
    this.state = {
	    first: false,
            signedUp: false,
            signedValid: false,
            isLoading: false,
            onHide: props.onHide,
            show: props.show,
	    emailValid: false,
	    passValid: false,
	    nameValid: false,
	    courseValid: false,
	    emailMessage: "Please enter an email!",
	    nameMessage: "",
	    courseMessage: "",
	    passMessage: ""
    };
    this.toggleSignedUp = this.toggleSignedUp.bind(this);
    this.toggleSignedUpBool = this.toggleSignedUpBool.bind(this);
    this.toggleSignedValid = this.toggleSignedValid.bind(this);
    this.toggleIsLoading = this.toggleIsLoading.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {error, alert } = this.props;
    if(error !== prevProps.error) {
     if(this.props.error.msg.email) {this.setState({emailValid: false,emailMessage: this.props.error.msg.email.join()})}
     else {this.setState({emailValid:true,emailMessage:""})}
     if(this.props.error.msg.password) {this.setState({passValid: false, passMessage: this.props.error.msg.pass.join()})}
     else {this.setState({passValid:true,passMessage:""})}
     if(this.props.error.msg.name) {this.setState({nameValid: false, nameMessage: this.props.error.msg.name.join()})}
     else {this.setState({nameValid: true,nameMessage: ""})}
     if(this.props.error.msg.name) {this.setState({courseValid: false, courseMessage: this.props.error.msg.course.join()})}
     else {this.setState({courseValid:true,courseMessage:""})}
    }
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

  checkValidity = () => {
    //return this.state.emailValid && this.state.nameValid && this.state.passValid;};
    return this.state.emailValid && this.state.nameValid && this.state.courseValid};

  handleSubmit = event => {
	  const form = event.currentTarget;
	  //if (this.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  //else{
          event.preventDefault();
	  if (!this.state.first) {this.setState({first:!this.state.first})};
	  this.setState({emailMessage:"",emailValid:true,nameValid:true,courseValid:true});
	  //this.toggleIsLoading();
	  const name = form.elements.name.value;
	  const email = form.elements.email.value;
	  const password = form.elements.password.value;
	  const course = form.elements.course.value;
	  const instructor = true;
	  const user = { name,email,password,instructor,course };
	  console.log(user);
	  this.props.register(user);
	  if (this.checkValidity() === true)
          {
	    this.toggleSignedUp();
	    this.toggleSignedValid(true);
	  }
  };

  render() {
    if (this.props.isAuth) {
      return <Redirect to="/dashboard" />;
    }
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
          <Form onSubmit={this.handleSubmit} validated={this.checkValidity()}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label> E-mail </Form.Label>
              <Form.Control type="email" name="email" placeholder="example@domain.com" isInvalid={!this.state.emailValid&&this.state.first} required />
              <Form.Control.Feedback type="invalid"> {this.state.emailMessage} </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" isInvalid={!this.state.passValid&&this.state.first} required/>
              <Form.Control.Feedback type="invalid"> Please enter a password! </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label> Name </Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" isValid={this.state.nameValid} isInvalid={!this.state.nameValid&&this.state.first} required/>
              <Form.Control.Feedback type="invalid"> Please enter a Name! </Form.Control.Feedback> 
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label> Course </Form.Label>
              <Form.Control type="text" name="course" placeholder="Course" isValid={this.state.courseValid} isInvalid={!this.state.courseValid&&this.state.first} required />
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
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.errors
});

export default connect(mapStateToProps,{register, addUser }) (SignupModal);
