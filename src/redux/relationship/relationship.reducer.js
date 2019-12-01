import pick from 'lodash/pick';
import get from 'lodash/get';
import {
  SET_RELATIONSHIP,
  END_RELATIONSHIP,
  CREATE_RELATIONSHIP_WITH_INVITE_ATTEMPT,
  CREATE_RELATIONSHIP_WITH_INVITE_SUCCESS,
  CREATE_RELATIONSHIP_WITH_INVITE_FAILURE,
} from './relationship.actions';
import {
  REQUEST_LOVER_SUCCESS,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
} from '../loverRequest/loverRequest.actions';
import { ACCEPT_LOVER_REQUEST_SUCCESS } from '../receivedLoverRequests/receivedLoverRequests.actions';
import { LOGOUT, GET_ME_SUCCESS } from '../user/user.actions';

const defaultState = {
  id: '',
  createdAt: '',
  isCreateRelationshipWithInviteInFlight: false,
  createRelationshipWithInviteError: '',
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
    case CREATE_RELATIONSHIP_WITH_INVITE_ATTEMPT: {
      return {
        ...state,
        isCreateRelationshipWithInviteInFlight: true,
        createRelationshipWithInviteError: '',
      };
    }
    case CREATE_RELATIONSHIP_WITH_INVITE_SUCCESS: {
      return {
        ...state,
        isCreateRelationshipWithInviteInFlight: false,
      };
    }
    case CREATE_RELATIONSHIP_WITH_INVITE_FAILURE: {
      return {
        ...state,
        isCreateRelationshipWithInviteInFlight: false,
        createRelationshipWithInviteError: action.errorMessage,
      };
    }
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS: {
      return { ...defaultState };
    }
    case GET_ME_SUCCESS: {
      const relationship = get(action.data, 'me.relationship');
      if (relationship) {
        return {
          ...state,
          id: relationship.id,
          createdAt: relationship.createdAt,
        };
      }
      return state;
    }
    default:
      return state;
  }
}
