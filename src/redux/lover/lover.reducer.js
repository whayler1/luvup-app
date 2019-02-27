import _ from 'lodash';
import { SET_LOVER, CLEAR_LOVER } from './lover.actions';
import { GET_TIMELINE_DATA_SUCCESS } from '../user/user.actions';

const defaultState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  relationshipScore: 0,
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
        ...state,
        id: '',
        username: '',
        firstName: '',
        lastName: '',
      };
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        relationshipScore: action.loverRelationshipScore,
      };
    default:
      return state;
  }
}
