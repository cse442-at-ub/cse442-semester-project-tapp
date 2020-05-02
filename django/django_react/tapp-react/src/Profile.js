import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from './actions/students';
import { login } from './actions/auth';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


export class ProfileModal extends Component  {

    constructor(props) {
    super(props)
    this.state = {
            show: props.show
    };

  }

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

  render() {
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> Profile </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
  }
}

ProfileModal.propTypes = {
        login: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        isAuth: PropTypes.bool,
        error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {login})(ProfileModal);
