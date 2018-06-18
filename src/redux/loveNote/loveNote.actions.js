import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';

export const CREATE_LOVE_NOTE = 'love-note/create-love-note';

export const createLoveNote = (note, { numLuvups, numJalapenos }) => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        createLoveNote(
          note: "${note}",
          numLuvups: ${numLuvups},
          numJalapenos: ${numJalapenos}
        ) {
          loveNote {
            id
          }
        }
      }`
    });
    const loveNoteId = _.get(res, 'body.data.createLoveNote.loveNote.id');

    return res;
  } catch (err) {
    return err;
  }
};
