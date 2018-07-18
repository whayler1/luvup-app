import _ from 'lodash';
import { CREATE_RELATIONSHIP_SCORE } from './relationshipScore.actions';

const defaultState = {
  id: '',
  createdAt: '',
  score: undefined,
  /**
   * JW: scoreQuartile isn't in the model. It's an extrapolation that tells us
   * what quartile the relationshipScore is in. i.e. 0-24 = 0, 25-49 = 1...
   * this helps simplify drawing views that only care about quartile.
   */
  scoreQuartile: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_RELATIONSHIP_SCORE:
      return {
        ...state,
        ..._.pick(action, ['id', 'createdAt', 'score']),
        scoreQuartile: Math.min(Math.floor(action.score * 0.04), 3),
      };
    default:
      return state;
  }
}
