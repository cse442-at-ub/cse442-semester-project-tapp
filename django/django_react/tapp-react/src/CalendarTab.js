import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export class CalendarTab extends Component{
  render() { 
    return (
  <div>
    <Calendar
      localizer={momentLocalizer(moment)}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    / >
  </div>
    )
  }
}

export default CalendarTab;
