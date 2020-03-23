import axios from 'axios';

import { GET_EVENTS, ADD_EVENT, GET_ERRORS } from './types';

//GET STUDENTS
export const getEvents = (param) => dispatch => {
  axios.get('http://localhost:3000/api/class?classNum='+param)
  .then(res => {
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  })
};


//ADD USER
export const addEvent = events => dispatch => {
  axios	
  .post('/api/class', events)
  .then(res => {
  dispatch({
    type: ADD_EVENT,
    payload: res.data
  });
  })
  .catch(err => {
  dispatch({
    type: GET_ERRORS, 
    payload: err
    });
  });
};
