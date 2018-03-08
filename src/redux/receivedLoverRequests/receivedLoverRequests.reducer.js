import {
  SET_RECEIVED_LOVER_REQUESTS,
} from './receivedLoverRequests.actions';

const defaultState = {
  rows: null,
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RECEIVED_LOVER_REQUESTS:
      return {
        ...state,
        rows: action.rows,
        count: action.count,
      };
      break;
    default:
      return state;
  }
};
