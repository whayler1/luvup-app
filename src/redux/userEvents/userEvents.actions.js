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
          quizItemEvents {
            id quizItemId userEventId
          }
          quizItems {
            id question senderChoiceId recipientChoiceId reward
            choices { answer }
          }
        }
      }`,
    });

    const {
      rows,
      count,
      loveNotes,
      loveNoteEvents,
      quizItems,
      quizItemEvents,
    } = res.body.data.userEvents;
    console.log('\n\n quizItems', quizItems);

    if (res.ok && _.isArray(rows)) {
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
