import _ from 'lodash';

import { graphQlRequest } from '../../helpers';

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
    const data = await graphQlRequest(`{
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
            id senderId recipientId question senderChoiceId recipientChoiceId reward createdAt
            choices { id answer }
          }
        }
      }`);

    const {
      rows,
      count,
      loveNotes,
      loveNoteEvents,
      quizItems,
      quizItemEvents,
    } = data.userEvents;

    if (_.isArray(rows)) {
      return dispatch({
        type: GET_USER_EVENTS_SUCCESS,
        rows,
        count,
        shouldAppend,
        loveNotes,
        loveNoteEvents,
        quizItems,
        quizItemEvents,
      });
    }
    return dispatch({
      type: GET_USER_EVENTS_FAILURE,
      error: 'response error',
    });
  } catch (error) {
    return dispatch({
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
