import _ from 'lodash';

import loverRequestApi from './loverRequest.api';

export const CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_ATTEMPT =
  'lover-request/create-lover-request-and-relationship-and-placeholder-lover-attempt';
export const CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS =
  'lover-request/create-lover-request-and-relationship-and-placeholder-lover-success';
export const CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_FAILURE =
  'lover-request/create-lover-request-and-relationship-and-placeholder-lover-failure';
export const REQUEST_LOVER_SUCCESS = 'lover-request/request-lover-success';
export const SET_LOVER_REQUEST = 'lover-request/set-lover-request';
export const CANCEL_LOVER_REQUEST_ATTEMPT =
  'lover-request/cancel-lover-request-attempt';
export const CANCEL_LOVER_REQUEST_SUCCESS =
  'lover-request/cancel-lover-request-success';
export const CANCEL_LOVER_REQUEST_FAILURE =
  'lover-request/cancel-lover-request-failure';
export const CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT =
  'lover-request/cancel-sent-lover-request-and-relationship-attempt';
export const CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS =
  'lover-request/cancel-sent-lover-request-and-relationship-success';
export const CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE =
  'lover-request/cancel-sent-lover-request-and-relationship-failure';
export const RESEND_LOVER_REQUEST_EMAIL_ATTEMPT =
  'lover-request/resend-lover-request-email-attempt';
export const RESEND_LOVER_REQUEST_EMAIL_SUCCESS =
  'lover-request/resend-lover-request-email-success';
export const RESEND_LOVER_REQUEST_EMAIL_FAILURE =
  'lover-request/resend-lover-request-email-failure';
export const CLEAR_LOVER_REQUEST = 'lover-request/clear-lover-request';
export const GET_LOVER_REQUEST_ATTEMPT =
  'lover-request/get-lover-request-attempt';
export const GET_LOVER_REQUEST_SUCCESS =
  'lover-request/get-lover-request-success';
export const GET_LOVER_REQUEST_FAILURE =
  'lover-request/get-lover-request-failure';

export const createLoverRequestAndRelationshipAndPlaceholderLover = (
  recipientId,
) => async (dispatch) => {
  dispatch({
    type: CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_ATTEMPT,
  });
  try {
    const res = await loverRequestApi.createLoverRequestAndRelationshipAndPlaceholderLover(
      recipientId,
    );

    const errors = _.get(res, 'body.errors', []);

    if (errors.length < 1) {
      dispatch({
        type: CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS,
        ...res.body.data.createLoverRequestAndRelationshipAndPlaceholderLover,
      });
      return;
    }
    dispatch({
      type: CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_FAILURE,
      errorMessage: errors[0].message,
    });
  } catch (error) {
    dispatch({
      type: CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_FAILURE,
      errorMessage: error.message,
    });
  }
};

export const requestLover = (recipientId) => async (dispatch) => {
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
      'body.data.cancelLoverRequest.loverRequest',
    );
    const relationshipId = _.get(
      res,
      'body.data.cancelLoverRequest.relationship.id',
    );

    if (loverRequest && loverRequest.id) {
      dispatch({
        type: CANCEL_LOVER_REQUEST_SUCCESS,
        doesRelationshipExist: _.isString(relationshipId),
      });
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

export const cancelSentLoverRequestAndRelationship = () => async (dispatch) => {
  dispatch({ type: CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT });
  try {
    const res = await loverRequestApi.cancelSentLoverRequestAndRelationship();
    const { loverRequest, relationship } = _.get(
      res,
      'body.data.cancelSentLoverRequestAndRelationship',
      {},
    );

    if (_.isPlainObject(loverRequest)) {
      dispatch({
        type: CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
        loverRequest,
        relationship,
      });
      return;
    }
    dispatch({
      type: CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE,
      errorMessage: _.get(
        res,
        'body.errors[0].message',
        'Error canceling lover request',
      ),
    });
  } catch (error) {
    dispatch({
      type: CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE,
      errorMessage: error.message,
    });
  }
};

export const resendLoverRequestEmail = (loverRequestId, email = '') => async (
  dispatch,
) => {
  dispatch({ type: RESEND_LOVER_REQUEST_EMAIL_ATTEMPT });
  try {
    const res = await loverRequestApi.resendLoverRequestEmail(
      loverRequestId,
      email,
    );

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

export const getLoverRequest = () => async (dispatch) => {
  dispatch({ type: GET_LOVER_REQUEST_ATTEMPT });
  try {
    const res = await loverRequestApi.getLoverRequest();
    const errorMessage = _.get(res, 'body.errors[0].message');
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    const loverRequest = _.get(
      res,
      'body.data.activeLoverRequest.loverRequest',
    );
    dispatch({
      type: GET_LOVER_REQUEST_SUCCESS,
      ...loverRequest,
    });
  } catch (err) {
    dispatch({
      type: GET_LOVER_REQUEST_FAILURE,
      errorMessage: err.message,
    });
  }
};
