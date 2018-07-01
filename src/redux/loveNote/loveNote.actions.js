import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';

export const CREATE_LOVE_NOTE_SUCCESS = 'love-note/create-love-note-success';
export const GET_RECEIVED_LOVE_NOTES_ATTEMPT = 'love-note/get-received-love-notes-attempt';
export const GET_RECEIVED_LOVE_NOTES_SUCCESS = 'love-note/get-received-love-notes-success';
export const GET_RECEIVED_LOVE_NOTES_FAILURE = 'love-note/get-received-love-notes-failure';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT = 'love-note/set-love-notes-read-with-created-at-attempt';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS = 'love-note/set-love-notes-read-with-created-at-success';
export const SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE = 'love-note/set-love-notes-read-with-created-at-failure';

export const createLoveNote = (note, { numLuvups = 0, numJalapenos = 0 }) => async dispatch => {
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
    const res = await superagent.post(config.graphQlUrl, {
      query,
    });

    const loveNote = _.get(res, 'body.data.createLoveNote.loveNote');

    if (res.ok && loveNote) {
      const { luvups, jalapenos } = loveNote;
      dispatch({
        type: CREATE_LOVE_NOTE_SUCCESS,
        luvups,
        jalapenos,
      });
    }

    return res;
  } catch (err) {
    console.log('\n\nerr', err);
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
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
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
      }`,
    });

    const { count, rows } = _.get(res, 'body.data.receivedLoveNotes', {});

    if (res.ok && _.isNumber(count)) {
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

export const setLoveNotesReadWithCreatedAt = (createdAt) => async dispatch => {
  dispatch({ type: SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT });
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        setLoveNotesReadWithCreatedAt(
          createdAt: "${createdAt}"
        ) {
          count
        }
      }`,
    });

    const count = _.get(res, 'body.data.setLoveNotesReadWithCreatedAt.count');

    if (res.ok && _.isNumber(count)) {
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
