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
import { patchCustomUser } from './actions/auth';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";


export class QueueTab extends Component  {
    constructor(props) {
    super(props)
    this.state = {
            show: props.show,
            isInstructor: false 
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    this.setState({
        isInstructor: event.target.checked,
    });
  }

  handleSubmit = event => {
	  const form = event.currentTarget;
	  //if (this.checkValidity() === false) { event.preventDefault(); event.stopPropagation();}
	  //else{
          event.preventDefault();
	  const instructor = this.state.isInstructor;
	  const course = form.elements.course.value;
	  var json = JSON.parse(this.props.user.listcourses)
	  if (!Object.keys(json).includes(course)) {
	    json[course]=instructor
	    this.props.patchCustomUser(JSON.stringify(json))
	  }
  };

  render() {
  return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Courses Enrolled  
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
	    <ListGroup variant="flush">
	    </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
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
        </Card>
      </Accordion>
  );
  }
}

QueueTab.propTypes = {
        patchCustomUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {patchCustomUser})(QueueTab);
