import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DateTime from 'react-datetime';
import './DateTime.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {Overlay} from 'react-bootstrap'
import {getEvents, addEvent, deleteEvent} from './actions/students';

function myEvent(deletefunc, { event }) {
  console.log(event);
  const popover=(<Popover id="popover-basic" style={{ zIndex: 10000 }}>
    <Popover.Title as="h2">{event.title}</Popover.Title>
    <Popover.Content>
	  <div> Start time: {moment(event.start).format('HH:mm')} </div>
	  <div> End time: {moment(event.end).format('HH:mm')} </div>
    </Popover.Content>
  </Popover>);

  const own_popover=(<Popover id="popover-basic" style={{ zIndex: 10000 }}>
    <Popover.Title as="h2">{event.title}</Popover.Title>
    <Popover.Content>
	  <div> Start time: {moment(event.start).format('HH:mm')} </div>
	  <div> End time: {moment(event.end).format('HH:mm')} </div>
	  <Button onClick= {deletefunc.bind(this,event.id)}> Delete entry? </Button>
    </Popover.Content>
  </Popover>);

  if (event.owner){
  return (
    <div>
      <div>
        <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="top" overlay={own_popover}>
          <div>{event.title}</div>
        </OverlayTrigger>
      </div>
    </div>
  );
  }
  else {
  return (
    <div>
      <div>
        <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="top" overlay={popover}>
          <div>{event.title}</div>
        </OverlayTrigger>
      </div>
    </div>
  );
  }
}

export class CalendarTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
	    startTime: "",
	    endTime: "",
	    date: "",
            invalidAlert: false,
  	    partmyEvent: myEvent.bind(null, this.props.deleteEvent)
    }
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myEvent = this.myEvent.bind(this);
    this.popover = this.popover.bind(this);
  }


  componentDidMount() {
    if(this.props.course != null)
    {
      this.props.getEvents(this.props.course);
      ;
    }
  }

  onChangeStart = e => this.setState({ startTime: e});
  onChangeEnd = e => this.setState({ endTime: e });
  onChangeDate = e => this.setState({ date: e});
  handleSubmit = e => {
	  if(!moment(this.state.date, 'YYYY-MM-DD', true).isValid)
          {
		  this.setState({invalidAlert:true});
	  }
	  else{
	  this.props.addEvent({startTime:moment(this.state.date.format('YYYY-MM-DD')+" "+moment(this.state.startTime).format("HH:mm"), 'YYYY-MM-DD HH:mm'), endTime:moment(this.state.date.format('YYYY-MM-DD')+" "+moment(this.state.endTime).format("HH:mm"), 'YYYY-MM-DD HH:mm'), classNum:this.props.course, allDay:false, instructor: this.props.usr.name, owner: this.props.usr.email});
	  }
      this.props.getEvents(this.props.course);
  }

  popover= e =>  
	  (<Popover id="popover-basic" style={{ zIndex: 10000 }}>
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>);

  myEvent = (e) => {

  console.log("Hello");
  let popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000 }}>
      <h1>{e.title}</h1>
    </Popover>
  );
 
  return (
        <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="left" overlay={popoverClickRootClose}>
          <div>{e.title}</div>
        </OverlayTrigger>);
  }

  render() { 
    if (this.props.instruct === true)
	  {
    return (
	    <>
  <div id="tab">
    <Container style={{backgroundColor:"#F5F9E9",borderRadius:"5px"}} fluid>
    <Row className="align-middle justify-content-md-center" style={{paddingTop:"15px",borderRadius:"5px"}} > 
    <Calendar
      localizer={momentLocalizer(moment)}
      popup
      defaultDate={moment().toDate()}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      components = {{event: this.state.partmyEvent}}
      events= {this.props.events.map(myevent => (
	      {
	        title:myevent.instructor+"'s Office hours",
	        owner:myevent.owner===this.props.usr.email,
	        id:myevent.id,
		start:moment(myevent.startTime).toDate(),
		end: moment(myevent.endTime).toDate()
	      }))}
      style={{ height: 700 }}
    / >
    </Row>
    <Row className="align-middle justify-content-md-center mt-3">
    <h3 name="instruct-field"> Instructor commands </h3>
    </Row>
    <Row className="align-middle justify-content-md-center mt-3">
  <Alert variant="danger" show = {this.state.invalidAlert} onClose = {() => this.setState({invalidAlert:false})} dismissible>
  Invalid Event entered.
  </Alert>
    </Row>
    <Row style={{paddingBottom:"20px"}}>
    <Col className="flex-column">
    <h5> Event date:   </h5>
    <DateTime inputProps={{placeholder: 'MM/DD/YYYY'}} onChange={this.onChangeDate} style={{height:"50px"}} timeFormat={false}/> 
    </Col>
    <Col className="flex-column">
    <h5> Time start:   </h5>
    <DateTime onChange={this.onChangeStart} dateFormat={false} inputProps={{placeholder: 'HH:MM AM/PM'}}/> 
    </Col>
    <Col className="flex-column">
    <h5> Time end:   </h5>
    <DateTime onChange={this.onChangeEnd} dateFormat={false} inputProps={{placeholder: 'HH:MM AM/PM'}}/> 
    </Col>
    </Row>
    <Row style={{paddingBottom:"100px"}}>
    <Col>
    <Button onClick={this.handleSubmit}> Submit </Button>
    </Col>
    </Row>
    </Container>
  </div>
  </>
    )
  }
   else
	  {
    return (
	    <>
  <div id="tab">
    <Container style={{backgroundColor:"#F5F9E9",borderRadius:"5px"}} fluid>
    <Row className="align-middle justify-content-md-center" style={{paddingTop:"15px",borderRadius:"5px"}} > 
    <Calendar
      localizer={momentLocalizer(moment)}
      defaultDate={moment().toDate()}
      popup
      events={[]}
      startAccessor="start"
      endAccessor="end"
      events= {this.props.events.map(myevent => (
	      {
	        title:myevent.instructor+"'s Office hours",
	        owner:myevent.owner,
	        id:myevent.id,
		start:moment(myevent.startTime).toDate(),
		end: moment(myevent.endTime).toDate()
	      }))}
      components = {{event: this.state.partmyEvent}}
      style={{ height: 700 }}
    / >
    </Row>
    <Row style={{paddingBottom:"50px"}}>
    </Row>
    </Container>
  </div>
  </>
    )
  }
  }
}

Calendar.propTypes = {
        addEvent: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired,
        getEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  events: state.students.events,
});

export default connect(mapStateToProps, {getEvents, addEvent, deleteEvent} )(CalendarTab);
