import axios from 'axios';
import { GET_QUEUES, ADD_QUEUE, DELETE_QUEUE, GET_ERRORS } from './types';

//GET STUDENTS
export const getQueues = (param) => dispatch => {
  axios.get('/api/officeHours?classNum='+param)
  .then(res => {
    dispatch({
      type: GET_QUEUES,
      payload: res.data
    });
  })
};


//ADD USER
export const addQueue = queues => dispatch => {
  axios	
  .post('/api/officeHours/', queues)
  .then(res => {
  dispatch({
    type: ADD_QUEUE,
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

export const deleteQueue = (id) => dispatch => {
  axios	
  .delete('/api/officeHours/'+id.toString()+'/')
  .then(res => {
  dispatch({
    type: DELETE_QUEUE,
    payload: id
  });
  })
  .catch(err => {
  dispatch({
    type: GET_ERRORS, 
    payload: err
    });
  });
};
