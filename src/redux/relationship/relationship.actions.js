import superagent from 'superagent';

import config from '../../config';

export const SET_RELATIONSHIP = 'relationship/set-relationship';

export const setRelationship = (id, createdAt) => dispatch => {
  console.log('setRelationship', id, createdAt);
  dispatch({ type: SET_RELATIONSHIP, id, createdAt });
};
