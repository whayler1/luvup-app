import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const GET_USER_EVENTS_ATTEMPT = 'userEvents/get-user-events-attempt';
export const GET_USER_EVENTS_SUCCESS = 'userEvents/get-user-events-success';
export const GET_USER_EVENTS_FAILURE = 'userEvents/get-user-events-failure';
export const SET_USER_EVENTS = 'userEvents/set-user-events';
export const CLEAR_USER_EVENTS = 'userEvents/clear-user-events';

export const getUserEvents = (
  limit = 0,
  offset = 0,
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

    const { rows, count, loveNotes, loveNoteEvents } = res.body.data.userEvents;
    console.log('res.body.data.userEvents', res.body.data.userEvents);
    console.log('limit', limit);
    console.log('offset', offset);

    if (res.ok && _.isArray(rows)) {
      console.log('res is ok');
      dispatch({
        type: GET_USER_EVENTS_SUCCESS,
        rows,
        count,
        shouldAppend,
        loveNotes,
        loveNoteEvents,
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
