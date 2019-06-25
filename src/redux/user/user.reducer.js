import _ from 'lodash';
import {
  SET_USER,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REAUTH,
  SEND_NEW_PASSWORD_ATTEMPT,
  SEND_NEW_PASSWORD_SUCCESS,
  SEND_NEW_PASSWORD_FAILURE,
  RESET_PASSWORD_WITH_GENERATED_PASSWORD_ATTEMPT,
  RESET_PASSWORD_WITH_GENERATED_PASSWORD_SUCCESS,
  RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE,
  USER_REQUEST_ATTEMPT,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  CONFIRM_USER_REQUEST_CODE_ATTEMPT,
  CONFIRM_USER_REQUEST_CODE_SUCCESS,
  CONFIRM_USER_REQUEST_CODE_FAILURE,
  CONFIRM_USER_REQUEST_ATTEMPT,
  CONFIRM_USER_REQUEST_SUCCESS,
  CONFIRM_USER_REQUEST_FAILURE,
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
  isLoginInFlight: false,
  loginError: '',
  isSendNewPasswordInFlight: false,
  sendNewPasswordError: '',
  isResetPasswordWithGeneratedPasswordInFlight: false,
  resetPasswordWithGeneratedPasswordError: '',
  isUserRequestInFlight: false,
  userRequestError: '',
  isGetTimelineDataInFlight: false,
  fetTimelineDataError: '',
  isGetMeInFlight: false,
  getMeErrorMessage: '',
  isReset: false,
  isConfirmUserRequestCodeInFlight: false,
  confirmUserRequestCodeError: '',
  isConfirmUserInFlight: false,
  confirmUserError: '',
};

const userAttribs = ['id', 'email', 'username', 'firstName', 'lastName'];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state,
        isLoginInFlight: true,
        loginError: '',
      };
    case LOGIN_SUCCESS:
    case REAUTH:
      appStateListener.start();
      return {
        ...state,
        ..._.pick(action, userAttribs),
        isLoginInFlight: false,
        isReset: action.isReset || false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoginInFlight: false,
        loginError: action.errorMessage,
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
    case RESET_PASSWORD_WITH_GENERATED_PASSWORD_ATTEMPT:
      return {
        ...state,
        isResetPasswordWithGeneratedPasswordInFlight: true,
        resetPasswordWithGeneratedPasswordError: '',
      };
    case RESET_PASSWORD_WITH_GENERATED_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetPasswordWithGeneratedPasswordInFlight: false,
      };
    case RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE:
      return {
        ...state,
        isResetPasswordWithGeneratedPasswordInFlight: false,
        resetPasswordWithGeneratedPasswordError: action.errorMessage,
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
    case CONFIRM_USER_REQUEST_ATTEMPT:
      return {
        ...state,
        isConfirmUserInFlight: true,
        confirmUserError: '',
      };
    case CONFIRM_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isConfirmUserInFlight: false,
      };
    case CONFIRM_USER_REQUEST_FAILURE:
      return {
        ...state,
        isConfirmUserInFlight: false,
        confirmUserError: action.errorMessage,
      };
    case CONFIRM_USER_REQUEST_CODE_ATTEMPT:
      return {
        ...state,
        isConfirmUserRequestCodeInFlight: true,
        confirmUserRequestCodeError: '',
      };
    case CONFIRM_USER_REQUEST_CODE_SUCCESS:
      return {
        ...state,
        isConfirmUserRequestCodeInFlight: false,
        email: action.email,
        code: action.code,
      };
    case CONFIRM_USER_REQUEST_CODE_FAILURE:
      return {
        ...state,
        isConfirmUserRequestCodeInFlight: false,
        confirmUserRequestCodeError: action.errorMessage,
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
