import pick from 'lodash/pick';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { SET_RELATIONSHIP, END_RELATIONSHIP } from './relationship.actions';
import {
  REQUEST_LOVER_SUCCESS,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
} from '../loverRequest/loverRequest.actions';
import { ACCEPT_LOVER_REQUEST_SUCCESS } from '../receivedLoverRequests/receivedLoverRequests.actions';
import { LOGOUT } from '../user/user.actions';

const defaultState = {
  id: '',
  createdAt: '',
};

const defaultKeys = Object.keys(defaultState);

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RELATIONSHIP:
      return {
        ...state,
        ...pick(action, defaultKeys),
      };
    case CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS:
      return {
        ...state,
        ...pick(action.relationship, defaultKeys),
      };
    case END_RELATIONSHIP:
      return {
        id: '',
        createdAt: '',
      };
    case LOGOUT:
      return { ...defaultState };
    case ACCEPT_LOVER_REQUEST_SUCCESS:
    case REQUEST_LOVER_SUCCESS:
      return {
        ...state,
        id: action.relationship.id,
        createdAt: action.relationship.createdAt,
      };
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS: {
      const endDate = get(action, 'relationship.endDate', '');
      if (isString(endDate) && endDate.length > 0) {
        return { ...defaultState };
      }
      return state;
    }
    default:
      return state;
  }
}
