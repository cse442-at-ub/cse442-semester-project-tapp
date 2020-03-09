import {GET_STUDENTS, ADD_USER} from "../actions/types.js"

const initialState = {
  students: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return {
      ...state,
      students: action.payload
      };
    case ADD_USER:
      return {
      ...state,
      students: [...state.students, action.payload]};
    default: return state
  }
}
