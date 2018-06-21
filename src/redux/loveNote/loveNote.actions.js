import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';

export const CREATE_LOVE_NOTE = 'love-note/create-love-note';

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
          }
        }
      }`,
    });

    return res;
  } catch (err) {
    console.log('\n\nerr', err);
    return err;
  }
};
