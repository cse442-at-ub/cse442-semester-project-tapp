import React, { Component } from 'react';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import "./styles.css";

import { useDispatch, useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopBar from './topbar';
import CalendarTab from './CalendarTab';
import { Link, Redirect } from "react-router-dom";
import {loadCustomUser} from './actions/auth';
import {getEvents} from './actions/students';

export class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Queues: false,
      Calendar: true
    };
  }

  render() { 
   const auth = this.props.isAuthenticated;
   const {authenticate, user} = this.props.authobj;
   console.log(auth);
   if (!auth)
   {
    return <Redirect exact to="/" />
   }
    return (
    <div id="main2">
    <TopBar />
    <Row className="align-middle justify-content-md-center"> 
    <h1 style={{color:"#f5f9e9"}} > Welcome to {user.course} , {user.email} </h1>
    </Row>
    <Row >
    <Tab.Container id="left-tabs-example" defaultActiveKey="Calendar">
        <Col style={{backgroundColor:"#F5F9E9", borderRadius:"5px", height:"85px"}} sm={2}>
          <Nav fill type="pills" className="flex-column">
            <Nav.Item >
              <Nav.Link style={{textColor:"white"}} eventKey="Calendar" onClick = {() => this.setState({Calendar:true, Queues: false})}>Calendar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Queues" onClick = {() => this.setState({Queues:true, Calendar: false})} >Queues</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="Calendar">
	    <CalendarTab course={user.course} instruct={user.instructor} name={user.name} />
            </Tab.Pane>
            <Tab.Pane eventKey="Queues">
            </Tab.Pane>
          </Tab.Content>
        </Col>
    </Tab.Container>
    </Row>
    </div>
    )
  }
}

Dashboard.propTypes = {
        isAuthenticated: PropTypes.bool,
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired,
        authobj: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  events: state.students.events,
  authobj: state.auth
});

export default connect(mapStateToProps, {getEvents} )(Dashboard);
