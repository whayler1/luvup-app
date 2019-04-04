import _ from 'lodash';
import receivedLoverRequestsApi from './receivedLoverRequests.api';

export const SET_RECEIVED_LOVER_REQUESTS =
  'received-lover-requests/set-received-lover-requests';
export const ACCEPT_LOVER_REQUEST_ATTEMPT =
  'received-lover-requests/accept-lover-request-attempt';
export const ACCEPT_LOVER_REQUEST_SUCCESS =
  'received-lover-requests/accept-lover-request-success';
export const ACCEPT_LOVER_REQUEST_FAILURE =
  'received-lover-requests/accept-lover-request-failure';
export const CLEAR_RECEIVED_LOVER_REQUESTS =
  'received-lover-requests/clear-received-lover-requests';

export const setReceivedLoverRequests = (rows, count) => ({
  type: SET_RECEIVED_LOVER_REQUESTS,
  rows,
  count,
});

export const getReceivedLoverRequests = () => async dispatch => {
  try {
    const res = await receivedLoverRequestsApi.getReceivedLoverRequests();

    const receivedLoverRequests = _.get(res, 'body.data.receivedLoverRequests');

    if (receivedLoverRequests) {
      dispatch(
        setReceivedLoverRequests(
          receivedLoverRequests.rows,
          receivedLoverRequests.count
        )
      );
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const acceptLoverRequest = loverRequestId => async dispatch => {
  dispatch({ type: ACCEPT_LOVER_REQUEST_ATTEMPT });
  try {
    const res = await receivedLoverRequestsApi.acceptLoverRequest(
      loverRequestId
    );

    const loverRequest = _.get(
      res,
      'body.data.acceptLoverRequest.loverRequest'
    );

    if (_.isObject(loverRequest) && loverRequest.id) {
      dispatch({
        type: ACCEPT_LOVER_REQUEST_SUCCESS,
        id: loverRequest.id,
        isAccepted: loverRequest.isAccepted,
        isSenderCanceled: loverRequest.isSenderCanceled,
        isRecipientCanceled: loverRequest.isRecipientCanceled,
        createdAt: loverRequest.createdAt,
      });
    } else {
      dispatch({
        type: ACCEPT_LOVER_REQUEST_FAILURE,
        errorMessage: 'Error accepting lover request',
      });
    }

    return res;
  } catch (err) {
    dispatch({ type: ACCEPT_LOVER_REQUEST_FAILURE, errorMessage: err.message });
    return err;
  }
};

export const clearReceivedLoverRequests = () => ({
  type: CLEAR_RECEIVED_LOVER_REQUESTS,
});
