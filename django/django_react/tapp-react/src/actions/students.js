import axios from 'axios';

import { GET_STUDENTS, ADD_USER, GET_ERRORS } from './types';

//GET STUDENTS
export const getStudents = () => dispatch => {
  axios.get('http://localhost:3000/api/users/')
  .then(res => {
    dispatch({
      type: GET_STUDENTS,
      payload: res.data
    });
  })
  .catch(err => console.log(err.response.data))
};


//ADD USER
export const addUser = user => dispatch => {
  axios	
  .post('http://localhost:3000/api/users/', user)
  .then(res => {
  dispatch({
    type: ADD_USER,
    payload: res.data
  });
  })
  .catch(err => {
    const errors = {
      msg: err.response.data,
      status: err.response.status}
  dispatch({
    type: GET_ERRORS, 
    payload: errors
    });
  });
};
