import superagent from 'superagent';

import config from '../../config';

const SET_RELATIONSHIP = 'relationship/set-relationship';

export const setRelationship = (id, createdAt) => ({ type: SET_RELATIONSHIP, id, createdAt });
