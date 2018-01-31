import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const GET_USER_EVENTS = 'userEvents/get-user-events';

export const getUserEvents = (limit, offset) => async dispatch => {
  console.log('limit', limit, 'offset', offset);
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        userEvents(
          limit: ${limit}
          offset: ${offset}
        ) {
          rows {
            id isViewed createdAt name relationshipId userId
          }
          count
        }
      }`
    });

    console.log('getUserEvents res', res.body.data);

    const {
      rows,
      count,
    } = res.body.data.userEvents;

    dispatch({
      type: GET_USER_EVENTS,
      rows,
      count,
    });

    return res;
  } catch (err) {
    console.log('getUserEvents err', err);
  }
};
