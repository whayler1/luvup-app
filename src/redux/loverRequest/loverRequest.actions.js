import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const REQUEST_LOVER = 'lover-request/request-lover';
export const SET_LOVER_REQUEST = 'lover-request/set-lover-request';
export const CANCEL_LOVER_REQUEST = 'lover-request/cancel-lover-request';

export const requestLover = recipientId => async dispatch => {
  console.log('requestLover recipientId', recipientId);
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        requestLover(recipientId: "${recipientId}") {
          id isAccepted isSenderCanceled isRecipientCanceled createdAt
          recipient {
            username firstName lastName
          }
        }
      }`
    });
    console.log('requestLover es', res.body.data);

    dispatch({
      type: REQUEST_LOVER,
      ...res.body.data.requestLover,
    });

    return res;
  } catch (err) {
    console.log('request lover error', err);
    return err;
  }
};

export const cancelLoverRequest = loverRequestId => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        cancelLoverRequest (
          loverRequestId: "${loverRequestId}"
        ) {
          loverRequest {
            id isAccepted isSenderCanceled isRecipientCanceled createdAt
          }
          error
        }
      }`,
    });

    const loverRequest = _.at(res, 'body.data.cancelLoverRequest.loverRequest')[0];

    if (loverRequest && loverRequest.id) {
      dispatch({
        type: CANCEL_LOVER_REQUEST,
        ..._.pick(loverRequest, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ]),
      });
    }

    return res;
  } catch (err) {
    console.log('cancelLoverRequest err', err);
    return err;
  }
}
