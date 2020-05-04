import {combineReducers} from 'redux';
import students from './students'
import errors from './errors'
import queues from './queues'
import auth from './auth'

export default combineReducers({
  students,
  auth,
  queues,
  errors
});
