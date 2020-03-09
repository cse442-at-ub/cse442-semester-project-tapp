import reducer from '../src/reducers/students'
import {initialState} from '../src/reducers/students'

describe( 'user get reducer', () => {
  it('should return the initialState', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })
  
  it('should handle GET_STUDENTS', () => {
    expect(
      reducer(initialState,
      {
        type: 'GET_STUDENTS'})).toMatchSnapshot()})
})
