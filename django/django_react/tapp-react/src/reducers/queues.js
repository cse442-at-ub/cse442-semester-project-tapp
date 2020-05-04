import {UP_QUEUE,GET_QUEUES, GET_INSTR, ADD_QUEUE, DELETE_QUEUE} from "../actions/types.js"

const initialState = {
  queues: [],
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_QUEUES:
      return {
      ...state,
      queues: action.payload
      };
    case DELETE_QUEUE:
      return {
      ...state,
      queues: state.queues.filter((even) => even.id !== action.payload)
      };
    case ADD_QUEUE:
      return {
      ...state,
      queues: [...state.queues, action.payload]};
    case UP_QUEUE:
      return {
      ...state,
      queues: state.queues.map((x) => (x.id===action.payload.id) ? action.payload : x)};
    default: return state
  }
}
