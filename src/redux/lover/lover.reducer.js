import _ from 'lodash';
import { SET_LOVER, CLEAR_LOVER } from './lover.actions';
import { GET_TIMELINE_DATA_SUCCESS } from '../user/user.actions';
import { REQUEST_LOVER_SUCCESS } from '../loverRequest/loverRequest.actions';

const defaultState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  isPlaceholder: false,
  relationshipScore: 0,
};

const loverProperties = [
  'id',
  'username',
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
      return {
        ...state,
        ...getRequestLoverSuccessLoverData(action),
      };
    case CLEAR_LOVER:
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
