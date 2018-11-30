import _ from 'lodash';
import {
  CREATE_RELATIONSHIP_SCORE,
  GET_RELATIONSHIP_SCORE_ATTEMPT,
  GET_RELATIONSHIP_SCORE_SUCCESS,
  GET_RELATIONSHIP_SCORE_FAILURE,
  GET_RELATIONSHIP_SCORES_ATTEMPT,
  GET_RELATIONSHIP_SCORES_SUCCESS,
  GET_RELATIONSHIP_SCORES_FAILURE,
  GET_RELATIONSHIP_SCORES_BY_DAY_ATTEMPT,
  GET_RELATIONSHIP_SCORES_BY_DAY_SUCCESS,
  GET_RELATIONSHIP_SCORES_BY_DAY_FAILURE,
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
  isGettingRelationshipScore: false,
  getRelationshipScoreError: '',
  isGettingRelationshipScores: false,
  getRelationshipScoresError: '',
  relationshipScores: [],
  isGettingRelationshipScoresByDay: false,
  getRelationshipScoresByDayError: '',
  relationshipScoresByDay: [],
  firstDate: null,
  count: undefined,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_RELATIONSHIP_SCORE:
      return {
        ...state,
        ..._.pick(action, ['id', 'createdAt', 'score']),
        scoreQuartile: Math.min(Math.floor(action.score * 0.04), 3),
      };
    case GET_RELATIONSHIP_SCORE_ATTEMPT:
      return {
        ...state,
        isGettingRelationshipScore: true,
        getRelationshipScoreError: '',
      };
    case GET_RELATIONSHIP_SCORE_SUCCESS:
      return {
        ...state,
        isGettingRelationshipScore: false,
        score: action.score,
      };
    case GET_RELATIONSHIP_SCORE_FAILURE:
      return {
        ...state,
        isGettingRelationshipScore: false,
        getRelationshipScoreError: action.error,
      };
    case GET_RELATIONSHIP_SCORES_ATTEMPT:
      return {
        ...state,
        isGettingRelationshipScores: true,
        getRelationshipScoresError: '',
      };
    case GET_RELATIONSHIP_SCORES_SUCCESS: {
      let relationshipScores;

      if (action.offset > 0) {
        relationshipScores = [...state.relationshipScores, ...action.rows];
      } else {
        relationshipScores = action.rows;
      }
      return {
        ...state,
        isGettingRelationshipScores: false,
        relationshipScores,
        count: action.count,
      };
    }
    case GET_RELATIONSHIP_SCORES_FAILURE:
      return {
        ...state,
        isGettingRelationshipScores: false,
        getRelationshipScoresError: action.error,
      };
    case GET_RELATIONSHIP_SCORES_BY_DAY_ATTEMPT:
      return {
        ...state,
        isGettingRelationshipScoresByDay: true,
        getRelationshipScoresByDayError: '',
      };
    case GET_RELATIONSHIP_SCORES_BY_DAY_SUCCESS:
      return {
        ...state,
        isGettingRelationshipScoresByDay: false,
        relationshipScoresByDay: action.isAppend
          ? [...state.relationshipScoresByDay, ...action.rows]
          : action.rows,
        firstDate: action.firstDate,
      };
    case GET_RELATIONSHIP_SCORES_BY_DAY_FAILURE:
      return {
        ...state,
        isGettingRelationshipScoresByDay: false,
        getRelationshipScoresByDay: action.error,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        score: _.get(action, 'data.relationshipScores.rows[0].score'),
      };
    default:
      return state;
  }
}
