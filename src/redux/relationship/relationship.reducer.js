import _ from 'lodash';
import {
  SET_RELATIONSHIP,
  END_RELATIONSHIP,
  CLEAR_RELATIONSHIP,
} from './relationship.actions';
import {
  REQUEST_LOVER_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT,
} from '../loverRequest/loverRequest.actions';
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
    case REQUEST_LOVER_SUCCESS:
      return {
        ...state,
        id: action.relationship.id,
        createdAt: action.relationship.createdAt,
      };
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT: {
      const endDate = _.get(action, 'relationship.endDate', '');
      if (_.isString(endDate) && endDate.length > 0) {
        return { ...defaultState };
      }
      return state;
    }
    default:
      return state;
  }
}
