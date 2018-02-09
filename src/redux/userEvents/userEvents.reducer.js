import _ from 'lodash';
import {
  GET_USER_EVENTS,
  SET_USER_EVENTS,
  CLEAR_USER_EVENTS,
} from './userEvents.actions';

const defaultState = {
  rows: [],
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case GET_USER_EVENTS:
    case SET_USER_EVENTS:
      const rows = action.shouldAppend ?
        [...state.rows, ...action.rows] : action.rows;
      return {
        ...state,
        rows,
        count: action.count,
      }
    default:
      return state;
  }
};
