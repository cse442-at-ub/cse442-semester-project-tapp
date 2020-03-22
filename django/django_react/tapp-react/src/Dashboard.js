import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";

import { useDispatch, useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopBar from './topbar';
import CalendarTab from './CalendarTab';

export class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Calendar: true,
      Queues: false
    };
  }

  render() { 
    return (
    <>
    <Row>
    <TopBar />
    </Row>
    <Row>
    <Tab.Container id="left-tabs-example" defaultActiveKey="Calendar">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item >
              <Nav.Link eventKey="Calendar" onClick = {() => this.setState({Calendar:true, Queues: false})}>Calendar</Nav.Link>
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
      </Row>
    </Tab.Container>
    </Row>
    </>
    )
  }
}

export default Dashboard;
