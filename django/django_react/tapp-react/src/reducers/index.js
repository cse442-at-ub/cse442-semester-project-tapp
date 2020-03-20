import {combineReducers} from 'redux';
import students from './students'
import errors from './errors'

export default combineReducers({
  students,
  errors
});
