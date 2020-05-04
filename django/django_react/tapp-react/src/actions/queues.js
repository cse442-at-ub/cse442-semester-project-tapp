import axios from 'axios';
import { UP_QUEUE, GET_QUEUES, ADD_QUEUE, DELETE_QUEUE, GET_ERRORS } from './types';

//GET STUDENTS
export const getQueues = (param) => dispatch => {
  axios.get('/api/officeHours/Get?classNum='+param)
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
  .post('/api/officeHours/Post', queues)
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


export const pQueue = (id,queue) => dispatch => {
  const body = {"queue":queue};
  axios
    .patch("/api/officeHours/Update/"+id+"/",body)
    .then(res => {
      dispatch({
        type: UP_QUEUE,
        payload: res.data
      });
    })
};

export const deleteQueue = (id) => dispatch => {
  axios	
  .delete('/api/officeHours/Delete/'+id.toString()+'/')
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

