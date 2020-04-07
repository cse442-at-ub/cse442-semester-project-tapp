import {GET_EVENTS, GET_INSTR, ADD_EVENT, DELETE_EVENT} from "../actions/types.js"

const initialState = {
  events: [],
  instructors: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_EVENTS:
      return {
      ...state,
      events: action.payload
      };
    case GET_INSTR:
      return {
      ...state,
      instructors: action.payload
      };
    case DELETE_EVENT:
      return {
      ...state,
      events: state.events.filter((even) => even.id !== action.payload)
      };
    case ADD_EVENT:
      return {
      ...state,
      events: [...state.events, action.payload]};
    default: return state
  }
}
