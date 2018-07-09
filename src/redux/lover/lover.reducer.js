import _ from 'lodash';
import { SET_LOVER, CLEAR_LOVER } from './lover.actions';

const defaultState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOVER:
      return {
        ...state,
        ..._.pick(action, 'id', 'username', 'firstName', 'lastName'),
      };
    case CLEAR_LOVER:
      return {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
      };
    default:
      return state;
  }
}
