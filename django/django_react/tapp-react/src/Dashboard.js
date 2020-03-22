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

export class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Queues: false,
      Calendar: true
    };
  }

  render() { 
    return (
    <div id="main2">
    <TopBar />
    <Row className="align-middle justify-content-md-center"> 
    <h1 style={{color:"#f5f9e9"}} > Welcome to class, name </h1>
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
	    <CalendarTab />
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

export default Dashboard;
