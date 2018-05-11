import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const GET_USER_EVENTS = 'userEvents/get-user-events';
export const SET_USER_EVENTS = 'userEvents/set-user-events';
export const CLEAR_USER_EVENTS = 'userEvents/clear-user-events';

export const getUserEvents = (limit, offset, shouldAppend=false) => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        userEvents(
          limit: ${limit}
          offset: ${offset}
        ) {
          rows {
            id isViewed createdAt name
          }
          count
        }
      }`
    });

    const {
      rows,
      count,
    } = res.body.data.userEvents;

    dispatch({
      type: GET_USER_EVENTS,
      rows,
      count,
      shouldAppend,
    });

    return res;
  } catch (err) {
    
  }
};

export const setUserEvents = (rows, count) => ({
  type: SET_USER_EVENTS,
  rows,
  count,
});

export const clearUserEvents = () => ({
  type: CLEAR_USER_EVENTS,
});
