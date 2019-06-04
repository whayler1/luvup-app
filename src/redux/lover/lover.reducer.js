import _ from 'lodash';
import { SET_LOVER } from './lover.actions';
import { GET_TIMELINE_DATA_SUCCESS, LOGOUT } from '../user/user.actions';
import { END_RELATIONSHIP } from '../relationship/relationship.actions';
import {
  REQUEST_LOVER_SUCCESS,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
} from '../loverRequest/loverRequest.actions';

const defaultState = {
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  isPlaceholder: false,
  relationshipScore: 0,
};

const loverProperties = [
  'id',
  'username',
  'email',
  'firstName',
  'lastName',
  'isPlaceholder',
];

const getRequestLoverSuccessLoverData = action => {
  const [lover] = _.get(action, 'relationship.lovers');
  return _.pick(lover, loverProperties);
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOVER:
      return {
        ...state,
        ..._.pick(action, loverProperties),
      };
    case REQUEST_LOVER_SUCCESS:
    case CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS:
      return {
        ...state,
        ...getRequestLoverSuccessLoverData(action),
      };
    case LOGOUT:
    case END_RELATIONSHIP:
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS:
      return { ...defaultState };
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        relationshipScore: action.loverRelationshipScore,
      };
    default:
      return state;
  }
}
