import _ from 'lodash';
import moment from 'moment';
import {
  CREATE_RELATIONSHIP_SCORE,
  GET_RELATIONSHIP_SCORE_ATTEMPT,
  GET_RELATIONSHIP_SCORE_SUCCESS,
  GET_RELATIONSHIP_SCORE_FAILURE,
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
  isGettingRelationshipScore: false,
  getRelationshipScoreError: '',
  isGettingRelationshipScores: false,
  getRelationshipScoresError: '',
  relationshipScores: [],
  relationshipScoresByDate: [],
  count: undefined,
};

const getRelationshipScoresByDate = rows =>
  rows.reduce((accumulator, row) => {
    const day = moment(new Date(row.createdAt)).format('YYYY-MM-DD');
    const newRow = { ...row, day };
    const lastRow = accumulator[accumulator.length - 1];

    if (!accumulator.length || (lastRow && lastRow.day > day)) {
      accumulator.push(newRow);
      return accumulator;
    }

    if (newRow.score > lastRow.score) {
      accumulator[accumulator.length - 1] = newRow;
    }

    return accumulator;
  }, []);

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
      let relationshipScoresByDate;

      if (action.offset > 0) {
        relationshipScores = [...state.relationshipScores, ...action.rows];
        relationshipScoresByDate = [
          ...state.relationshipScoresByDate,
          ...getRelationshipScoresByDate(action.rows),
        ];
      } else {
        relationshipScores = action.rows;
        relationshipScoresByDate = getRelationshipScoresByDate(action.rows);
      }
      return {
        ...state,
        isGettingRelationshipScores: false,
        relationshipScores,
        relationshipScoresByDate,
        count: action.count,
      };
    }
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
