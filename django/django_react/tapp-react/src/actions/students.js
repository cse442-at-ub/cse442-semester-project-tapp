import axios from 'axios';

import { GET_STUDENTS } from './types';

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
