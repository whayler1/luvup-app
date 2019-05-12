import _ from 'lodash';

import loverRequestApi from './loverRequest.api';

export const REQUEST_LOVER_SUCCESS = 'lover-request/request-lover-success';
export const SET_LOVER_REQUEST = 'lover-request/set-lover-request';
export const CANCEL_LOVER_REQUEST_ATTEMPT =
  'lover-request/cancel-lover-request-attempt';
export const CANCEL_LOVER_REQUEST_SUCCESS =
  'lover-request/cancel-lover-request-success';
export const CANCEL_LOVER_REQUEST_FAILURE =
  'lover-request/cancel-lover-request-failure';
export const RESEND_LOVER_REQUEST_EMAIL_ATTEMPT =
  'lover-request/resend-lover-request-email-attempt';
export const RESEND_LOVER_REQUEST_EMAIL_SUCCESS =
  'lover-request/resend-lover-request-email-success';
export const RESEND_LOVER_REQUEST_EMAIL_FAILURE =
  'lover-request/resend-lover-request-email-failure';
export const CLEAR_LOVER_REQUEST = 'lover-request/clear-lover-request';

export const requestLover = recipientId => async dispatch => {
  try {
    const res = await loverRequestApi.requestLover(recipientId);

    dispatch({
      type: REQUEST_LOVER_SUCCESS,
      ...res.body.data.requestLover,
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const cancelLoverRequest = () => async (dispatch, getState) => {
  dispatch({ type: CANCEL_LOVER_REQUEST_ATTEMPT });
  const {
    loverRequest: { id: loverRequestId },
  } = getState();
  try {
    const res = await loverRequestApi.cancelLoverRequest(loverRequestId);

    const loverRequest = _.get(
      res,
      'body.data.cancelLoverRequest.loverRequest'
    );

    if (loverRequest && loverRequest.id) {
      dispatch({ type: CANCEL_LOVER_REQUEST_SUCCESS });
    } else {
      dispatch({
        type: CANCEL_LOVER_REQUEST_FAILURE,
        errorMessage: 'Error canceling lover request',
      });
    }

    return res;
  } catch (err) {
    dispatch({ type: CANCEL_LOVER_REQUEST_FAILURE, errorMessage: err.message });
    return err;
  }
};

export const resendLoverRequestEmail = loverRequestId => async dispatch => {
  dispatch({ type: RESEND_LOVER_REQUEST_EMAIL_ATTEMPT });
  try {
    const res = await loverRequestApi.resendLoverRequestEmail(loverRequestId);

    dispatch({ type: RESEND_LOVER_REQUEST_EMAIL_SUCCESS });
    return res;
  } catch (err) {
    dispatch({
      type: RESEND_LOVER_REQUEST_EMAIL_FAILURE,
      errorMessage: err.message,
    });
    return err;
  }
};

export const clearLoverRequest = () => ({ type: CLEAR_LOVER_REQUEST });
