import _ from 'lodash';
import {
  GET_USER_EVENTS_ATTEMPT,
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_FAILURE,
  SET_USER_EVENTS,
  CLEAR_USER_EVENTS,
} from './userEvents.actions';

const defaultState = {
  isGetUserEventsInFlight: false,
  getUserEventsError: '',
  rows: [],
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case GET_USER_EVENTS_ATTEMPT:
      console.log('get user events attempt');
      return {
        ...state,
        isGetUserEventsInFlight: true,
        getUserEventsError: '',
      };
    case GET_USER_EVENTS_SUCCESS:
    case SET_USER_EVENTS:
      console.log('\n\n---\n get user events success!');
      const rows = action.shouldAppend ?
        [...state.rows, ...action.rows] : action.rows;
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: '',
        rows,
        count: action.count,
      }
    case GET_USER_EVENTS_FAILURE:
    console.log('get user events failure');
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: action.error,
      };
    default:
      return state;
  }
};
