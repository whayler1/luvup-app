import _ from 'lodash';
import superagent from 'superagent';
import graphQlRequest from '../../helpers/graphQlRequest';

import config from '../../config';

export const CREATE_RELATIONSHIP_SCORE =
  'relationship-score/create-relationship-score';
export const GET_RELATIONSHIP_SCORE_ATTEMPT =
  'relationship-score/get-relationship-score-attempt';
export const GET_RELATIONSHIP_SCORE_SUCCESS =
  'relationship-score/get-relationship-score-success';
export const GET_RELATIONSHIP_SCORE_FAILURE =
  'relationship-score/get-relationship-score-failure';
export const GET_RELATIONSHIP_SCORES_ATTEMPT =
  'relationship-score/get-relationship-scores-attempt';
export const GET_RELATIONSHIP_SCORES_SUCCESS =
  'relationship-score/get-relationship-scores-success';
export const GET_RELATIONSHIP_SCORES_FAILURE =
  'relationship-score/get-relationship-scores-failure';
export const GET_RELATIONSHIP_SCORES_BY_DAY_ATTEMPT =
  'relationship-score/get-relationship-scores-by-day-attempt';
export const GET_RELATIONSHIP_SCORES_BY_DAY_SUCCESS =
  'relationship-score/get-relationship-scores-by-day-success';
export const GET_RELATIONSHIP_SCORES_BY_DAY_FAILURE =
  'relationship-score/get-relationship-scores-by-day-failure';

export const createRelationshipScore = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        createRelationshipScore {
          relationshipScore {
            id createdAt score
          }
        }
      }`,
    });

    if (_.at(res, 'body.data.createRelationshipScore.relationshipScore')[0]) {
      dispatch({
        type: CREATE_RELATIONSHIP_SCORE,
        ..._.pick(res.body.data.createRelationshipScore.relationshipScore, [
          'id',
          'createdAt',
          'score',
        ]),
      });
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const getRelationshipScore = () => async dispatch => {
  dispatch({ type: GET_RELATIONSHIP_SCORE_ATTEMPT });
  try {
    const res = await graphQlRequest(`{
      relationshipScores(limit: 1) {
        rows {
          score
        }
      }
    }`);
    const rows = _.get(res, 'relationshipScores.rows');

    if (_.isArray(rows) && rows.length > 0) {
      dispatch({
        type: GET_RELATIONSHIP_SCORE_SUCCESS,
        score: rows[0].score,
      });
    } else {
      dispatch({
        type: GET_RELATIONSHIP_SCORE_FAILURE,
        error: 'response error',
      });
    }
  } catch (error) {
    dispatch({
      type: GET_RELATIONSHIP_SCORE_FAILURE,
      error,
    });
  }
};

export const getRelationshipScores = (
  limit = 20,
  offset = 0
) => async dispatch => {
  dispatch({ type: GET_RELATIONSHIP_SCORES_ATTEMPT });

  try {
    const res = await graphQlRequest(`{
      relationshipScores(
        limit: ${limit}
        offset: ${offset}
      ) {
        count
        rows {
          id
          score
          createdAt
        }
      }
    }`);

    const { rows, count } = _.get(res, 'relationshipScores', {});

    if (_.isArray(rows)) {
      dispatch({
        type: GET_RELATIONSHIP_SCORES_SUCCESS,
        count,
        rows,
        offset,
      });
    } else {
      dispatch({
        type: GET_RELATIONSHIP_SCORES_FAILURE,
        error: 'response error',
      });
    }
  } catch (error) {
    dispatch({
      type: GET_RELATIONSHIP_SCORES_FAILURE,
      error,
    });
  }
};

export const getRelationshipScoresByDay = ({
  endDate,
  startDate,
}) => async dispatch => {
  dispatch({
    type: GET_RELATIONSHIP_SCORES_BY_DAY_ATTEMPT,
  });
  try {
    const startDateStr = startDate ? `startDate: "${startDate}"` : '';
    const res = await graphQlRequest(`{
      relationshipScoresByDay(
        endDate: "${endDate}"
        ${startDateStr}
      ) {
        rows {
          day
          relationshipScore {
            id score createdAt
          }
        }
        firstDate
      }
    }`);

    const { rows, firstDate } = res;

    if (_.isArray(rows)) {
      dispatch({
        type: GET_RELATIONSHIP_SCORES_BY_DAY_SUCCESS,
        rows,
        firstDate,
      });
    } else {
      dispatch({
        type: GET_RELATIONSHIP_SCORES_BY_DAY_FAILURE,
        error: 'no rows',
      });
    }
  } catch (err) {
    dispatch({
      type: GET_RELATIONSHIP_SCORES_BY_DAY_FAILURE,
      error: err.message,
    });
  }
};
