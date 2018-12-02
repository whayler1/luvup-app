import _ from 'lodash';

import { graphQlRequest } from '../../helpers';
import analytics from '../../services/analytics';
export const CREATE_LOVE_NOTE_ATTEMPT = 'love-note/create-love-note-attempt';
export const CREATE_LOVE_NOTE_SUCCESS = 'love-note/create-love-note-success';
export const CREATE_LOVE_NOTE_FAILURE = 'love-note/create-love-note-failure';
export const GET_RECEIVED_LOVE_NOTES_ATTEMPT =
  'love-note/get-received-love-notes-attempt';
export const GET_RECEIVED_LOVE_NOTES_SUCCESS =
  'love-note/get-received-love-notes-success';
export const GET_RECEIVED_LOVE_NOTES_FAILURE =
  'love-note/get-received-love-notes-failure';
export const SET_LOVE_NOTE_READ_ATTEMPT =
  'love-note/set-love-note-read-attempt';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT =
  'love-note/set-love-notes-read-with-created-at-attempt';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS =
  'love-note/set-love-notes-read-with-created-at-success';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE =
  'love-note/set-love-notes-read-with-created-at-failure';
export const GET_UNREAD_LOVE_NOTES_SUCCESS =
  'love-note/get-unread-love-notes-success';

const getUnreadLoveNotes = async dispatch => {
  const query = `{
    receivedLoveNotes(
      limit: 0,
      offset: 0,
      isRead: false,
    ) { count }
  }`;
  try {
    const data = await graphQlRequest(query);

    const unreadReceivedLoveNoteCount = _.get(data, 'receivedLoveNotes.count');

    if (_.isNumber(unreadReceivedLoveNoteCount)) {
      dispatch({
        type: GET_UNREAD_LOVE_NOTES_SUCCESS,
        unreadReceivedLoveNoteCount,
      });
    }
  } catch (err) {
    // JW: handle err
  }
};

export const createLoveNote = (
  note,
  { numLuvups = 0, numJalapenos = 0 }
) => async dispatch => {
  dispatch({ type: CREATE_LOVE_NOTE_ATTEMPT });
  const query = `mutation {
    createLoveNote(
      note: "${encodeURI(note)}",
      numJalapenos: ${numJalapenos},
      numLuvups: ${numLuvups},
    ) {
      loveNote {
        id
        luvups {
          id createdAt
        }
        jalapenos {
          id createdAt
        }
      }
    }
  }`;
  try {
    const data = await graphQlRequest(query);

    const loveNote = _.get(data, 'createLoveNote.loveNote');

    if (loveNote) {
      const { luvups, jalapenos } = loveNote;
      dispatch({
        type: CREATE_LOVE_NOTE_SUCCESS,
        luvups,
        jalapenos,
      });
      return data;
    }
    dispatch({
      type: CREATE_LOVE_NOTE_FAILURE,
      errorMessage: _.get(data, 'error.message', 'Error creating love note'),
    });
    return data;
  } catch (err) {
    dispatch({ type: CREATE_LOVE_NOTE_FAILURE, errorMessage: err.message });
    return err;
  }
};

export const getReceivedLoveNotes = ({
  isRead = null,
  shouldAppend = false,
  limit = 20,
  offset = 0,
}) => async dispatch => {
  dispatch({ type: GET_RECEIVED_LOVE_NOTES_ATTEMPT });
  try {
    const isReadArg = _.isBoolean(isRead) ? `isRead: ${isRead}` : '';
    const res = await graphQlRequest(`{
      receivedLoveNotes(
        limit: ${limit}
        offset: ${offset}
        ${isReadArg}
      ) {
        count
        rows {
          id note createdAt numLuvups numJalapenos
        }
      }
    }`);

    const { count, rows } = _.get(res, 'receivedLoveNotes', {});

    if (_.isNumber(count)) {
      dispatch({
        type: GET_RECEIVED_LOVE_NOTES_SUCCESS,
        count,
        rows,
        shouldAppend,
      });
    } else {
      dispatch({
        type: GET_RECEIVED_LOVE_NOTES_FAILURE,
        error: 'response error',
      });
    }
  } catch (error) {
    dispatch({
      type: GET_RECEIVED_LOVE_NOTES_FAILURE,
      error,
    });
  }
};

export const setLoveNoteRead = loveNoteId => async (dispatch, getState) => {
  dispatch({
    type: SET_LOVE_NOTE_READ_ATTEMPT,
    loveNoteId,
  });
  const userId = getState().user.id;
  try {
    const res = await graphQlRequest(`mutation {
      setLoveNoteRead(
        loveNoteId: "${loveNoteId}"
      ) {
        loveNote { id, isRead }
      }
    }`);

    const { id, isRead } = _.get(res, 'loveNote', {});

    if (!id || isRead === false) {
      analytics.track({
        userId,
        event: 'setLoveNoteRead error',
        properties: {
          message: 'Did not return love note id or isRead is false',
        },
      });
    }
    getUnreadLoveNotes(dispatch);
  } catch (err) {
    analytics.track({
      userId,
      event: 'setLoveNoteRead error',
      properties: {
        message: err.message,
      },
    });
  }
};

export const setLoveNotesReadWithCreatedAt = createdAt => async dispatch => {
  dispatch({ type: SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT });
  try {
    const res = await graphQlRequest(`mutation {
      setLoveNotesReadWithCreatedAt(
        createdAt: "${createdAt}"
      ) {
        count
      }
    }`);

    const count = _.get(res, 'setLoveNotesReadWithCreatedAt.count');

    if (_.isNumber(count)) {
      dispatch({ type: SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS });
    } else {
      dispatch({
        type: SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE,
        error: 'response error',
      });
    }
  } catch (error) {
    dispatch({
      type: SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE,
      error,
    });
  }
};
