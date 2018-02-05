import superagent from 'superagent';

import config from '../../config';

export const CREATE_RELATIONSHIP_SCORE = 'relationship-score/create-relationship-score';

export const createRelationshipScore = () => async dispatch => {
  try {
    const res = superagent.post(config.graphQlUrl, {
      query: `mutation {
        createRelationshipScore {
          relationshipScore {
            id createdAt score
          }
        }
      }`,
    });

    console.log('createRelationshipScore res', res);

    if (_.at(res, 'body.createRelationshipScore.relationshipScore')[0]) {
      dispatch({
        type: CREATE_RELATIONSHIP_SCORE,
        ..._.pick(res.body.createRelationshipScore.relationshipScore, [
          'id',
          'createdAt',
          'score',
        ])
      })
    }

    return res;
  } catch (err) {
    console.log('createRelationshipScore err', err);
    return err;
  }
};
