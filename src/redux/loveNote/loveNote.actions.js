import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';

export const CREATE_LOVE_NOTE_SUCCESS = 'love-note/create-love-note-success';

export const createLoveNote = (note, { numLuvups = 0, numJalapenos = 0 }) => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        createLoveNote(
          note: "${note}",
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
      }`,
    });

    const loveNote = _.get(res, 'body.data.createLoveNote.loveNote');

    console.log('\n\n loveNote', loveNote);

    if (loveNote) {
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
