import _ from 'lodash';
import {
  SET_USER,
  LOGIN,
  LOGOUT,
  REAUTH,
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
      return {
        ..._.pick(action, 'id', 'email', 'username'),
      };
    case LOGOUT:
      return {
        id: '',
        email: '',
        username: '',
      };
    default:
      return state;
  };
};
