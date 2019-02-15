import _ from 'lodash';
import {
  SET_USER,
  LOGIN,
  LOGOUT,
  REAUTH,
  SEND_NEW_PASSWORD_ATTEMPT,
  SEND_NEW_PASSWORD_SUCCESS,
  SEND_NEW_PASSWORD_FAILURE,
  USER_REQUEST_ATTEMPT,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  CONFIRM_USER_REQUEST_CODE,
  GET_TIMELINE_DATA_ATTEMPT,
  GET_TIMELINE_DATA_FAILURE,
  GET_TIMELINE_DATA_SUCCESS,
  GET_ME_ATTEMPT,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
} from './user.actions';
import appStateListener from '../../services/appStateListener';

const defaultState = {
  id: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  code: '',
  isSendNewPasswordInFlight: false,
  sendNewPasswordError: '',
  isUserRequestInFlight: false,
  userRequestError: '',
  isGetTimelineDataInFlight: false,
  fetTimelineDataError: '',
  isGetMeInFlight: false,
  getMeErrorMessage: '',
};

const userAttribs = ['id', 'email', 'username', 'firstName', 'lastName'];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
    case REAUTH:
      appStateListener.start();
      return {
        ...state,
        ..._.pick(action, userAttribs),
      };
    case SET_USER:
      return {
        ...state,
        ..._.pick(action, userAttribs),
      };
    case LOGOUT:
      appStateListener.stop();
      return { ...defaultState };
    case SEND_NEW_PASSWORD_ATTEMPT:
      return {
        ...state,
        isSendNewPasswordInFlight: true,
        sendNewPasswordError: '',
      };
    case SEND_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isSendNewPasswordInFlight: false,
      };
    case SEND_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        isSendNewPasswordInFlight: false,
        sendNewPasswordError: action.errorMessage,
      };
    case USER_REQUEST_ATTEMPT:
      return {
        ...state,
        userRequestError: '',
        isUserRequestInFlight: true,
      };
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        isUserRequestInFlight: false,
        email: action.email,
      };
    case USER_REQUEST_FAILURE:
      return {
        ...state,
        isUserRequestInFlight: false,
        userRequestError: action.errorMessage,
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
    case GET_ME_ATTEMPT:
      return {
        ...state,
        isGetMeInFlight: true,
        getMeErrorMessage: '',
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        isGetMeInFlight: false,
        ..._.pick(action.data.me, userAttribs),
      };
    case GET_ME_FAILURE:
      return {
        ...state,
        isGetMeInFlight: false,
        getMeErrorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}
