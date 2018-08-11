import _ from 'lodash';
import {
  CREATE_RELATIONSHIP_SCORE,
  GET_RELATIONSHIP_SCORES_ATTEMPT,
  GET_RELATIONSHIP_SCORES_SUCCESS,
  GET_RELATIONSHIP_SCORES_FAILURE,
} from './relationshipScore.actions';
import { GET_ME_SUCCESS } from '../user/user.actions';

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
  isGettingRelationshipScores: false,
  getRelationshipScoresError: '',
  relationshipScores: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_RELATIONSHIP_SCORE:
      return {
        ...state,
        ..._.pick(action, ['id', 'createdAt', 'score']),
        scoreQuartile: Math.min(Math.floor(action.score * 0.04), 3),
      };
    case GET_RELATIONSHIP_SCORES_ATTEMPT:
      return {
        ...state,
        isGettingRelationshipScores: true,
        getRelationshipScoresError: '',
      };
    case GET_RELATIONSHIP_SCORES_SUCCESS:
      return {
        ...state,
        isGettingRelationshipScores: false,
        relationshipScores: action.rows,
      };
    case GET_RELATIONSHIP_SCORES_FAILURE:
      return {
        ...state,
        isGettingRelationshipScores: false,
        getRelationshipScoresError: action.error,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        score: action.data.relationshipScores.rows[0].score,
      };
    default:
      return state;
  }
}
