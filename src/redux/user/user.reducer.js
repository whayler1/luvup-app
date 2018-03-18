import _ from 'lodash';
import {
  SET_USER,
  LOGIN,
  LOGOUT,
  REAUTH,
  USER_REQUEST,
  CONFIRM_USER_REQUEST_CODE,
} from './user.actions';

const defaultState = {
  id: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  code: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
    case LOGIN:
    case REAUTH:
      return {
        ..._.pick(action, 'id', 'email', 'username', 'firstName', 'lastName'),
      };
    case LOGOUT:
      return {...defaultState};
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
    default:
      return state;
  };
};
