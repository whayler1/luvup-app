import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';

export const CREATE_LOVE_NOTE_SUCCESS = 'love-note/create-love-note-success';
export const GET_RECEIVED_LOVE_NOTES_ATTEMPT = 'love-note/get-received-love-notes-attempt';
export const GET_RECEIVED_LOVE_NOTES_SUCCESS = 'love-note/get-received-love-notes-success';
export const GET_RECEIVED_LOVE_NOTES_FAILURE = 'love-note/get-received-love-notes-failure';

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
