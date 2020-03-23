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
import {getEvents, addEvent} from './actions/students';

export class CalendarTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
	    startTime: "",
	    endTime: "",
	    date: "",
            invalidAlert: false,
    }
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
	  this.props.addEvent({startTime:moment(this.state.date.format('YYYY-MM-DD')+" "+moment(this.state.startTime).format("HH:mm"), 'YYYY-MM-DD HH:mm'), endTime:moment(this.state.date.format('YYYY-MM-DD')+" "+moment(this.state.endTime).format("HH:mm"), 'YYYY-MM-DD HH:mm'), classNum:this.props.course, allDay:false});
	  }
  }

  render() { 
    return (
	    <>
  <div id="tab">
    <Container style={{backgroundColor:"#F5F9E9",borderRadius:"5px"}} fluid>
    <Row className="align-middle justify-content-md-center" style={{paddingTop:"15px",borderRadius:"5px"}} > 
    <Calendar
      localizer={momentLocalizer(moment)}
      defaultDate={moment().toDate()}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      events= {this.props.events.map(myevent => (
	      {
	        title:"Office hours",
		start:moment(myevent.startTime).toDate(),
		end: moment(myevent.endTime).toDate()
	      }))}
      style={{ height: 700 }}
    / >
    </Row>
    <Row className="align-middle justify-content-md-center mt-3">
    <h3> Instructor commands </h3>
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
}

Calendar.propTypes = {
        addEvent: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  events: state.students.events,
});

export default connect(mapStateToProps, {getEvents, addEvent} )(CalendarTab);
