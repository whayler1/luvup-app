import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const GET_USER_EVENTS_ATTEMPT = 'userEvents/get-user-events-attempt';
export const GET_USER_EVENTS_SUCCESS = 'userEvents/get-user-events-success';
export const GET_USER_EVENTS_FAILURE = 'userEvents/get-user-events-failure';
export const SET_USER_EVENTS = 'userEvents/set-user-events';
export const CLEAR_USER_EVENTS = 'userEvents/clear-user-events';

export const getUserEvents = (
  limit,
  offset,
  shouldAppend = false
) => async dispatch => {
  dispatch({ type: GET_USER_EVENTS_ATTEMPT });

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
          loveNoteEvents {
            id loveNoteId userEventId
          }
          loveNotes {
            id note createdAt isRead senderId recipientId numLuvups numJalapenos
          }
        }
      }`,
    });

    const { rows, count } = res.body.data.userEvents;

    if (res.ok && _.isArray(rows)) {
      dispatch({
        type: GET_USER_EVENTS_SUCCESS,
        rows,
        count,
        shouldAppend,
      });
    } else {
      dispatch({
        type: GET_USER_EVENTS_FAILURE,
        error: 'response error',
      });
    }

    return res;
  } catch (error) {
    dispatch({
      type: GET_USER_EVENTS_FAILURE,
      error: error.message,
    });
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
