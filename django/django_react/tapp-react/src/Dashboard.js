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

export class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Calendar: true,
      Queues: false
    };
  }

  render() { 
   const auth = this.props.isAuthenticated;
   console.log(auth);
   if (!auth)
   {
    return <Redirect exact to="/" />
   }
   return (
   <div id="main2">
   <TopBar logout={true} />
   <Row className="align-middle justify-content-md-center"> 
   <h1 style={{color:"#f5f9e9"}} > Welcome to class, name </h1>
   </Row>
   <Row >
   <Tab.Container id="left-tabs-example" defaultActiveKey="Calendar">
       <Col sm={2}>
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
   </Tab.Container>
   </Row>
   </div>
   )
  }
}

Dashboard.propTypes = {
        isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);
