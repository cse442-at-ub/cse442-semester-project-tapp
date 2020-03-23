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
});

describe( 'User post reducer', () => {
  it('should handle GET_STUDENTS', () => {
  let state = reducer(initialState, {type:'GET_STUDENTS',payload:[{id:1,name:'Matthew Hertz',email:'hertz@thiscourseisthebest.com',course:'CSE442',created_at:'2020-03-09T18:35:57.307650Z'},{id:2,name:'a',email:'a@a.com',course:'a',created_at:'2020-03-09T20:03:35.025141Z'},{id:3,name:'s',email:'a@c.com',course:'a',created_at:'2020-03-20T19:22:12.561446Z'},{id:4,name:'a',email:'a@d.com',course:'a',created_at:'2020-03-20T19:48:15.558828Z'},{id:5,name:'a',email:'a@e.com',course:'a',created_at:'2020-03-20T19:49:40.034040Z'},{id:6,name:'a',email:'a@G.com',course:'a',created_at:'2020-03-20T20:34:29.427601Z'},{id:7,name:'a',email:'a@f.com',course:'a',created_at:'2020-03-20T20:37:40.976850Z'},{id:8,name:'a',email:'a@wew.com',course:'a',created_at:'2020-03-20T20:43:09.229492Z'}]});
  expect(state).toEqual({ students: 
         [ { id: 1,
             name: 'Matthew Hertz',
             email: 'hertz@thiscourseisthebest.com',
             course: 'CSE442',
             created_at: '2020-03-09T18:35:57.307650Z' },
           { id: 2,
             name: 'a',
             email: 'a@a.com',
             course: 'a',
             created_at: '2020-03-09T20:03:35.025141Z' },
           { id: 3,
             name: 's',
             email: 'a@c.com',
             course: 'a',
             created_at: '2020-03-20T19:22:12.561446Z' },
           { id: 4,
             name: 'a',
             email: 'a@d.com',
             course: 'a',
             created_at: '2020-03-20T19:48:15.558828Z' },
           { id: 5,
             name: 'a',
             email: 'a@e.com',
             course: 'a',
             created_at: '2020-03-20T19:49:40.034040Z' },
           { id: 6,
             name: 'a',
             email: 'a@G.com',
             course: 'a',
             created_at: '2020-03-20T20:34:29.427601Z' },
           { id: 7,
             name: 'a',
             email: 'a@f.com',
             course: 'a',
             created_at: '2020-03-20T20:37:40.976850Z' },
           { id: 8,
             name: 'a',
             email: 'a@wew.com',
             course: 'a',
             created_at: '2020-03-20T20:43:09.229492Z' } ] }
);
});
})
