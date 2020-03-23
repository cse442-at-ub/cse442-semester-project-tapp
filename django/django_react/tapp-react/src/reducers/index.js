import {combineReducers} from 'redux';
import students from './students'
import errors from './errors'
import auth from './auth'

export default combineReducers({
  students,
  auth,
  errors
});
