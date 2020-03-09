import axios from 'axios';

import { GET_STUDENTS, ADD_USER } from './types';

//GET STUDENTS
export const getStudents = () => dispatch => {
  axios.get('http://localhost:3000/api/users/')
  .then(res => {
    dispatch({
      type: GET_STUDENTS,
      payload: res.data
    });
  })
  .catch(err => console.log(err))
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
  .catch(err => console.log(err))
};
