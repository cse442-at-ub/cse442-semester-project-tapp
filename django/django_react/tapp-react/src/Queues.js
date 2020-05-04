import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from './actions/students';
import { login } from './actions/auth';
import { QueueModal } from './QueueModal.js';
import { getQueues, addQueue, pQueue } from './actions/queues';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


export class QueueTab extends Component  {
    constructor(props) {
    super(props)
    this.state = {
            modal: false,
            details: -1,
            isInstructor: false 
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    this.setState({
        isInstructor: event.target.checked,
    });
  }

  componentDidMount(prevProps, prevState) {
    if(this.props.course != null)
    {
      this.props.getQueues(this.props.course);
      ;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.course != null && (this.props.course != prevProps.course ))
    {
      this.props.getQueues(this.props.course);
    }
  }

  handleSubmit = event => {
	  const form = event.currentTarget;
	  //if (this.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  //else{
          event.preventDefault();
	  const topic = form.elements.course.value;
	  if(this.props.course)
	  this.props.addQueue({	queue: "[]", classNum: this.props.course, title: topic});
          this.props.getQueues(this.props.course);
  };

  render() {
  return (
      <Accordion>
      <QueueModal queues={this.props.queues} patch={this.props.pQueue} user={this.props.use} details={this.state.details} show={this.state.modal} onHide={() => this.setState({details:-1,modal: false})} />
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Open Queues for your class
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
	      <ListGroup variant="flush">
	        {
                  this.props.queues.map((id) => (
	            <ListGroup.Item>
	                 <Button onClick={() => this.setState({modal: true, details: id.id})}> {id.title}: </Button>
	            </ListGroup.Item>
	          ))
	        }
	      </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
	{ this.props.use.instructor ? 
        (<Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Make Queue 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
	        <Form.Group controlId="formBasicText">
	          <Form.Label> <b>Title: </b> </Form.Label>
	          <Form.Control name="course" type="text" placeholder="Enter Title" required/>
                  <Form.Control.Feedback type="invalid"> {this.state.emailMessage} </Form.Control.Feedback> 
	        </Form.Group>
	      <Button variant="primary" type="submit" disabled={this.props.isLoad}> {this.props.isLoad ? 'Loading...':'Submit'} </Button>
	    </Form>
	    </Card.Body>
          </Accordion.Collapse>
        </Card>) : null
	  }
      </Accordion>
  );
  }
}

QueueTab.propTypes = {
        queues: PropTypes.array.isRequired,
        addQueue: PropTypes.func.isRequired,
        pQueue: PropTypes.func.isRequired,
        getQueues: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	queues: state.queues.queues
});

export default connect(mapStateToProps, {getQueues, addQueue, pQueue})(QueueTab);
