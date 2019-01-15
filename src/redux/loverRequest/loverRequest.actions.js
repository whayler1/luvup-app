import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';
import loverRequestApi from './loverRequest.api';

export const REQUEST_LOVER = 'lover-request/request-lover';
export const SET_LOVER_REQUEST = 'lover-request/set-lover-request';
export const CANCEL_LOVER_REQUEST = 'lover-request/cancel-lover-request';
export const RESEND_LOVER_REQUEST_EMAIL =
  'lover-request/resend-lover-request-email';
export const CLEAR_LOVER_REQUEST = 'lover-request/clear-lover-request';

export const requestLover = recipientId => async dispatch => {
  try {
    const res = await loverRequestApi.requestLover(recipientId);

    dispatch({
      type: REQUEST_LOVER,
      ..._.pick(res.body.data.requestLover, [
        'id',
        'isAccepted',
        'isSenderCanceled',
        'isRecipientCanceled',
        'createdAt',
      ]),
      ..._.pick(res.body.data.requestLover.recipient, [
        'username',
        'firstName',
        'lastName',
      ]),
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const cancelLoverRequest = loverRequestId => async dispatch => {
  try {
    const res = await loverRequestApi.cancelLoverRequest(loverRequestId);

    const loverRequest = _.get(
      res,
      'body.data.cancelLoverRequest.loverRequest'
    );

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
    return err;
  }
};

export const resendLoverRequestEmail = loverRequestId => async () => {
  try {
    const res = await loverRequestApi.resendLoverRequestEmail(loverRequestId);

    return res;
  } catch (err) {
    return err;
  }
};

export const clearLoverRequest = () => ({ type: CLEAR_LOVER_REQUEST });
