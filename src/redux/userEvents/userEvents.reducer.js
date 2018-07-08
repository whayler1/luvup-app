import _ from 'lodash';
import {
  GET_USER_EVENTS_ATTEMPT,
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_FAILURE,
  SET_USER_EVENTS,
  CLEAR_USER_EVENTS,
} from './userEvents.actions';
import {
  GET_TIMELINE_DATA_ATTEMPT,
  GET_TIMELINE_DATA_SUCCESS,
  GET_TIMELINE_DATA_FAILURE,
} from '../user/user.actions';

const defaultState = {
  isGetUserEventsInFlight: false,
  getUserEventsError: '',
  rows: [],
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case GET_USER_EVENTS_ATTEMPT:
    case GET_TIMELINE_DATA_ATTEMPT:
      console.log('get user events attempt');
      return {
        ...state,
        isGetUserEventsInFlight: true,
        getUserEventsError: '',
      };
    case GET_USER_EVENTS_SUCCESS:
    case SET_USER_EVENTS:
    case GET_TIMELINE_DATA_SUCCESS:
      console.log('\n\n---\n get user events success!', action);
      let rows = action.shouldAppend ?
        [...state.rows, ...action.rows] : action.rows;
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: '',
        rows,
        count: action.count,
      };
    case GET_USER_EVENTS_FAILURE:
    case GET_TIMELINE_DATA_FAILURE:
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: action.error,
      };
    default:
      return state;
  }
};
