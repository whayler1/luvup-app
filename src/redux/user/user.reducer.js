import _ from 'lodash';
import {
  SET_USER,
  LOGIN,
  LOGOUT,
  REAUTH,
  USER_REQUEST,
} from './user.actions';

const defaultState = {
  id: '',
  email: '',
  username: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
    case LOGIN:
    case REAUTH:
      return {
        ..._.pick(action, 'id', 'email', 'username'),
      };
    case LOGOUT:
      return {
        id: '',
        email: '',
        username: '',
      };
    case USER_REQUEST:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  };
};
