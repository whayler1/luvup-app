import _ from 'lodash';
import {
  SET_RELATIONSHIP,
  END_RELATIONSHIP,
} from './relationship.actions';

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
    default:
      return state;
  }
};
