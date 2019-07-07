import {
  GET_USER_INVITE_ATTEMPT,
  GET_USER_INVITE_SUCCESS,
  GET_USER_INVITE_FAILURE,
} from './userInvite.actions';
import { LOGOUT } from '../user/user.actions';

const defaultState = {
  isGetUserInviteInFlight: false,
  getUserInviteError: '',
  id: '',
  recipientEmail: '',
  recipientFirstName: '',
  recipientLastName: '',
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
    case LOGOUT:
      return { ...defaultState };
    default:
      return { ...state };
  }
}
