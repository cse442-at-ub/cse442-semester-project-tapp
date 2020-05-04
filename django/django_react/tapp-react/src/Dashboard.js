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
import QueueTab from './Queues';
import ProfileModal from './Profile';
import Info from './Info';
import { Link, Redirect } from "react-router-dom";
import {loadCustomUser} from './actions/auth';
import {getEvents} from './actions/students';

export class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Queues: false,
      Staff: false,
      profile: false,
      Calendar: true
    };
  }

  toggleProfile = () => {
    this.setState({
      profile: true
    });
  };

  render() { 
   const auth = this.props.isAuthenticated;
   const {authenticate, user} = this.props.authobj;
   if (!auth)
   {
    return <Redirect exact to="/" />
   }
    return (
    <div id="main2">
    <TopBar prof={() => this.setState({profile: true})} myuser={user}/>
    <Row className="align-middle justify-content-md-center"> 
    <h1 style={{color:"#f5f9e9"}} > Welcome to {user.course} , {user.email} </h1>
    </Row>
    <Row >
    <Tab.Container id="left-tabs-example" defaultActiveKey="Calendar">
        <Col style={{backgroundColor:"#F5F9E9", borderRadius:"5px", height:"125px"}} sm={2}>
          <Nav fill type="pills" className="flex-column">
            <Nav.Item >
              <Nav.Link style={{textColor:"white"}} eventKey="Calendar" onClick = {() => this.setState({Calendar:true, Queues: false, Staff: false})}>Calendar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Queues" onClick = {() => this.setState({Queues:true, Calendar: false, Staff: false})} >Queues</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Info" onClick = {() => this.setState({Queues:false, Calendar: false, Staff: true})} > Staff List </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="Calendar">
	    <CalendarTab course={user.course} instruct={user.instructor} name={user.name} usr={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="Queues">
	    <QueueTab course={user.course}/>
            </Tab.Pane>
            <Tab.Pane eventKey="Info">
	    <Info course={user.course}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
    </Tab.Container>
    </Row>
    <ProfileModal user={user} show={this.state.profile} onHide={() => this.setState({profile: false})} />
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
