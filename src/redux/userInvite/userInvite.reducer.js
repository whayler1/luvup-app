import {
  GET_USER_INVITE_ATTEMPT,
  GET_USER_INVITE_SUCCESS,
  GET_USER_INVITE_FAILURE,
  GET_USER_INVITE_WITH_ID_ATTEMPT,
  GET_USER_INVITE_WITH_ID_SUCCESS,
  GET_USER_INVITE_WITH_ID_FAILURE,
  RESEND_USER_INVITE_ATTEMPT,
  RESEND_USER_INVITE_SUCCESS,
  RESEND_USER_INVITE_FAILURE,
} from './userInvite.actions';
import { LOGOUT } from '../user/user.actions';

const defaultState = {
  isGetUserInviteInFlight: false,
  getUserInviteError: '',
  isGetUserInviteWithIdInFlight: false,
  getUserInviteWithIdError: '',
  isResendUserInviteInFlight: false,
  resendUserInviteError: '',
  id: '',
  recipientEmail: '',
  recipientFirstName: '',
  recipientLastName: '',
  received: {
    id: '',
    recipientEmail: '',
    recipientFirstName: '',
    recipientLastName: '',
    sender: {},
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USER_INVITE_ATTEMPT:
      return {
        ...state,
        isGetUserInviteInFlight: true,
        getUserInviteError: '',
      };
    case GET_USER_INVITE_SUCCESS:
      return {
        ...state,
        isGetUserInviteInFlight: false,
        id: action.id,
        recipientEmail: action.recipientEmail,
        recipientFirstName: action.recipientFirstName,
        recipientLastName: action.recipientLastName,
      };
    case GET_USER_INVITE_FAILURE:
      return {
        ...state,
        isGetUserInviteInFlight: false,
        getUserInviteError: action.errorMessage,
      };
    case GET_USER_INVITE_WITH_ID_ATTEMPT:
      return {
        ...state,
        isGetUserInviteWithIdInFlight: true,
        getUserInviteWithIdError: '',
      };
    case GET_USER_INVITE_WITH_ID_SUCCESS:
      return {
        ...state,
        isGetUserInviteWithIdInFlight: false,
        received: {
          ...state.received,
          id: action.id,
          recipientEmail: action.recipientEmail,
          recipientFirstName: action.recipientFirstName,
          recipientLastName: action.recipientLastName,
          sender: action.sender,
        },
      };
    case GET_USER_INVITE_WITH_ID_FAILURE:
      return {
        ...state,
        isGetUserInviteWithIdInFlight: false,
        getUserInviteWithIdError: action.errorMessage,
      };
    case RESEND_USER_INVITE_ATTEMPT:
      return {
        ...state,
        isResendUserInviteInFlight: true,
        resendUserInviteError: '',
      };
    case RESEND_USER_INVITE_SUCCESS:
      return {
        ...state,
        isResendUserInviteInFlight: false,
      };
    case RESEND_USER_INVITE_FAILURE:
      return {
        ...state,
        isResendUserInviteInFlight: false,
        resendUserInviteError: action.errorMessage,
      };
    case LOGOUT:
      return { ...defaultState };
    default:
      return { ...state };
  }
}
