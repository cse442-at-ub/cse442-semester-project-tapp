import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DateTime from 'react-datetime';
import './DateTime.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export class CalendarTab extends Component{
  constructor(props) {
    super(props);
  }
  render() { 
    return (
  <div>
    <Container style={{backgroundColor:"#F5F9E9",borderRadius:"5px"}} fluid>
    <Row className="align-middle justify-content-md-center" style={{paddingTop:"15px",borderRadius:"5px"}} > 
    <Calendar
      localizer={momentLocalizer(moment)}
      defaultDate={moment().toDate()}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    / >
    </Row>
    <Row className="align-middle justify-content-md-center mt-3">
    <h3> Instructor commands </h3>
    </Row>
    <Row style={{paddingBottom:"20px"}}>
    <Col className="flex-column">
    <h5> Event date:   </h5>
    <DateTime style={{height:"50px"}} timeFormat={false}/> 
    </Col>
    <Col className="flex-column">
    <h5> Time start:   </h5>
    <DateTime dateFormat={false}/> 
    </Col>
    <Col className="flex-column">
    <h5> Time end:   </h5>
    <DateTime dateFormat={false}/> 
    </Col>
    </Row>
    <Row style={{paddingBottom:"10px"}}>
    <Col>
    <Button> Submit </Button>
    </Col>
    </Row>
    </Container>
  </div>
    )
  }
}

export default CalendarTab;
