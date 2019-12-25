import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  SET_RECEIVED_LOVER_REQUESTS,
  ACCEPT_LOVER_REQUEST_ATTEMPT,
  ACCEPT_LOVER_REQUEST_SUCCESS,
  ACCEPT_LOVER_REQUEST_FAILURE,
  CLEAR_RECEIVED_LOVER_REQUESTS,
  CANCEL_RECEIVED_LOVER_REQUEST_ATTEMPT,
  CANCEL_RECEIVED_LOVER_REQUEST_SUCCESS,
  CANCEL_RECEIVED_LOVER_REQUEST_FAILURE,
} from './receivedLoverRequests.actions';
import { GET_USER_INVITE_WITH_ID_SUCCESS } from '../userInvite/userInvite.actions';
import { GET_ME_SUCCESS, LOGOUT } from '../user/user.actions';

const defaultState = {
  rows: null,
  count: null,
  isAcceptLoverRequestInFlight: false,
  acceptLoverRequestError: '',
  isCancelReceivedLoverRequestInFlight: false,
  cancelReceivedLoverRequestError: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USER_INVITE_WITH_ID_SUCCESS:
      return {
        ...state,
        rows: [action.loverRequest],
      };
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
        (loverReq) => loverReq.id === action.id,
      );
      rows[loverRequestIndex] = {
        ...rows[loverRequestIndex],
        ...pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ]),
      };
      return {
        ...state,
        isAcceptLoverRequestInFlight: false,
        rows,
      };
    }
    case ACCEPT_LOVER_REQUEST_FAILURE:
      return {
        ...state,
        isAcceptLoverRequestInFlight: false,
        acceptLoverRequestError: action.errorMessage,
      };
    case LOGOUT:
      return { ...defaultState };
    case CANCEL_RECEIVED_LOVER_REQUEST_ATTEMPT:
      return {
        ...state,
        isCancelReceivedLoverRequestInFlight: true,
        cancelReceivedLoverRequestError: '',
      };
    case CANCEL_RECEIVED_LOVER_REQUEST_SUCCESS: {
      return {
        ...state,
        isCancelReceivedLoverRequestInFlight: false,
        rows: action.rows,
        count: action.count,
      };
    }
    case CANCEL_RECEIVED_LOVER_REQUEST_FAILURE:
      return {
        ...state,
        isCancelReceivedLoverRequestInFlight: false,
        cancelReceivedLoverRequestError: action.errorMessage,
      };
    case GET_ME_SUCCESS: {
      const receivedLoverRequests = get(action.data, 'receivedLoverRequests');
      if (receivedLoverRequests) {
        return {
          ...state,
          rows: receivedLoverRequests.rows,
          count: receivedLoverRequests.count,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
