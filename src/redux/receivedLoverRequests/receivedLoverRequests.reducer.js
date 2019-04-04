import _ from 'lodash';
import {
  SET_RECEIVED_LOVER_REQUESTS,
  ACCEPT_LOVER_REQUEST_ATTEMPT,
  ACCEPT_LOVER_REQUEST_SUCCESS,
  ACCEPT_LOVER_REQUEST_FAILURE,
  CLEAR_RECEIVED_LOVER_REQUESTS,
} from './receivedLoverRequests.actions';

const defaultState = {
  rows: null,
  count: null,
  isAcceptLoverRequestInFlight: false,
  acceptLoverRequestError: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RECEIVED_LOVER_REQUESTS:
      return {
        ...state,
        rows: action.rows,
        count: action.count,
      };
    case ACCEPT_LOVER_REQUEST_ATTEMPT:
      return {
        ...state,
        isAcceptLoverRequestInFlight: true,
        acceptLoverRequestError: '',
      };
    case ACCEPT_LOVER_REQUEST_SUCCESS: {
      const rows = [...state.rows];
      const loverRequestIndex = state.rows.findIndex(
        loverReq => loverReq.id === action.id
      );
      rows[loverRequestIndex] = {
        ...rows[loverRequestIndex],
        ..._.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ]),
        isAcceptLoverRequestInFlight: false,
      };
      return {
        ...state,
        rows,
      };
    }
    case ACCEPT_LOVER_REQUEST_FAILURE:
      return {
        ...state,
        isAcceptLoverRequestInFlight: false,
        acceptLoverRequestError: action.errorMessage,
      };
    case CLEAR_RECEIVED_LOVER_REQUESTS:
      return { ...defaultState };
    default:
      return state;
  }
}
