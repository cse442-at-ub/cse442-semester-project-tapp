import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';

import "./styles.css";

import { useDispatch, useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopBar from './topbar';
import CalendarTab from './CalendarTab';
import { Link, Redirect } from "react-router-dom";
import {loadCustomUser} from './actions/auth';
import {getInstructors} from './actions/students';

export class Info extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Queues: false,
      Calendar: true
    };
  }

  componentDidUpdate() {
    if(this.props.course != null)
    {
      this.props.getInstructors(this.props.course);
      ;
    }
  }

  render() { 
   return (
   <div id="tab">
   <Container style={{backgroundColor:"#F5F9E9",borderRadius:"5px"}} fluid>
   <h3> {this.props.course} Staff list </h3>
   <Row>
   <Col>
   <Table striped bordered hover variant="dark">
   <thead>
   <tr>
      <th>Name </th>
      <th>Email</th>
   </tr>
   </thead>
   <tbody>
     {
       this.props.instructors.map((inst) => (
	       <tr>
	         <td> {inst.name} </td>
	         <td> {inst.email} </td>
	       </tr>
       ))
     }
   </tbody>
   </Table>
   </Col>
   </Row>
   </Container>
   </div>
    )
  }
}

Info.propTypes = {
        getInstructors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  instructors: state.students.instructors,
});

export default connect(mapStateToProps, {getInstructors} )(Info);
