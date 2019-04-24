import _ from 'lodash';
import {
  SET_RELATIONSHIP,
  END_RELATIONSHIP,
  CLEAR_RELATIONSHIP,
} from './relationship.actions';
import { ACCEPT_LOVER_REQUEST_SUCCESS } from '../receivedLoverRequests/receivedLoverRequests.actions';

const defaultState = {
  id: '',
  createdAt: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RELATIONSHIP:
      return {
        ...state,
        ..._.pick(action, 'id', 'createdAt'),
      };
    case END_RELATIONSHIP:
      return {
        id: '',
        createdAt: '',
      };
    case CLEAR_RELATIONSHIP:
      return { ...defaultState };
    case ACCEPT_LOVER_REQUEST_SUCCESS:
      return {
        ...state,
        id: action.relationship.id,
        createdAt: action.relationship.createdAt,
      };
    default:
      return state;
  }
}
