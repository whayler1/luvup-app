import superagent from 'superagent';

import config from '../../config';
import { clearLover } from '../lover/lover.actions';

export const SET_RELATIONSHIP = 'relationship/set-relationship';
export const END_RELATIONSHIP = 'relationship/end-relationship';

export const setRelationship = (id, createdAt) => dispatch => {
  console.log('setRelationship', id, createdAt);
  dispatch({ type: SET_RELATIONSHIP, id, createdAt });
};

export const endRelationship = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        endRelationship {
          relationship {
            id endDate
          }
        }
      }`,
    });

    console.log('end relationship success', res);
    dispatch({ type: END_RELATIONSHIP });
    dispatch(clearLover());

    return res;
  } catch (err) {
    console.log('endRelationship err', err);
    return err;
  }
}
