import _ from 'lodash';
import {
  SET_USER,
} from './user.actions';

const defaultState = {
  id: '',
  email: '',
  username: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ..._.pick(action, 'id', 'email', 'username'),
      }
    default:
      return state;
  };
};
