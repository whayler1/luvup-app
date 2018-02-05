import {
  CREATE_RELATIONSHIP_SCORE
} from './relationshipScore.actions';

const defaultState = {
  id: '',
  createdAt: '',
  score: undefined,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_RELATIONSHIP_SCORE:
      return {
        ...state,
        ..._.pick(action, ['id', 'createdAt', 'score']),
      }
    default:
      return state;
  }
}
