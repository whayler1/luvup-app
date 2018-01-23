import superagent from 'superagent';

import config from '../../config';

export const REQUEST_LOVER = 'lover-request/request-lover';

export const requestLover = recipientId => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        requestLover(recipientId: "${recipientId}") {
          id isAccepted isSenderCanceled isRecipientCanceled createdAt
        }
      }`
    });
    console.log('requestLover es', res);

    return res;
  } catch (err) {
    console.log('request lover error', err);
    return err;
  }
};
