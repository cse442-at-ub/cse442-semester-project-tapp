import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from './actions/students';
import { Link } from "react-router-dom";
import { getQueues, pQueue } from './actions/queues';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


export class QueueModal extends Component  {

    constructor(props) {
    super(props)
    this.state = {
            show: props.show,
            isInstructor: false 
    };
    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
  }

  handlePop = () => {
	  const course = this.props.user.email;
          const myq = this.props.queues.find((x) => x.id === this.props.details) 
	  var json = JSON.parse(myq.queue)
	  if (json.length > 0) {
	    json.shift()
	    this.props.patch(myq.id, JSON.stringify(json))
  	  };
  }

  handlePush = () => {
	  const course = this.props.user.email;
          const myq = this.props.queues.find((x) => x.id === this.props.details) 
	  var json = JSON.parse(myq.queue)
	  if (!json.includes(course)) {
	    json.push(course)
            this.props.patch(myq.id, JSON.stringify(json));
  	  };
  }

  render() {
  if (this.props.details != -1){
  const myq = this.props.queues.find((x) => x.id === this.props.details) 
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title> myq.title </Modal.Title>
      </Modal.Header>
      <Modal.Body>
	  <ListGroup>
	        {
                  JSON.parse(myq.queue).map((id) => (
	            <ListGroup.Item>
			  {(id === this.props.user.email) ? this.props.user.name : "(Anonymous)" }
	            </ListGroup.Item>
	          ))
	        }
	  </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick = {this.handlePush} > Join Queue </Button>
        <Button onClick = {this.handlePop} > Pop Top </Button>
        <Button> Refresh </Button>
        <Button onClick={this.props.onHide}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
  }
  else {
  return (
    <Modal onHide = {this.props.onHide} show = {this.props.show} size="lg" centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
    </Modal>
  );
  }
  }
}
QueueModal.propTypes = {
        pQueue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {pQueue})(QueueModal);
