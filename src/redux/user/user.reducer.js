import _ from 'lodash';
import {
  SET_USER,
  LOGIN,
  LOGOUT,
  REAUTH,
  USER_REQUEST,
  CONFIRM_USER_REQUEST_CODE,
  GET_TIMELINE_DATA_ATTEMPT,
  GET_TIMELINE_DATA_FAILURE,
  GET_TIMELINE_DATA_SUCCESS,
} from './user.actions';
import appStateListener from '../../services/appStateListener';

const defaultState = {
  id: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  code: '',
  isGetTimelineDataInFlight: false,
  fetTimelineDataError: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
    case REAUTH:
      appStateListener.start();
    case SET_USER:
      return {
        ..._.pick(action, 'id', 'email', 'username', 'firstName', 'lastName'),
      };
    case LOGOUT:
      appStateListener.stop();
      return { ...defaultState };
    case USER_REQUEST:
      return {
        ...state,
        email: action.email,
      };
    case CONFIRM_USER_REQUEST_CODE:
      return {
        ...state,
        email: action.email,
        code: action.code,
      };
    case GET_TIMELINE_DATA_ATTEMPT:
      return {
        ...state,
        isGetTimelineDataInFlight: true,
        getTimelineDataError: '',
      };
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        isGetTimelineDataInFlight: false,
      };
    case GET_TIMELINE_DATA_FAILURE:
      return {
        ...state,
        isGetTimelineDataInFlight: false,
        error: action.error,
      };
    default:
      return state;
  }
}
