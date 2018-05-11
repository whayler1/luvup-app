import superagent from 'superagent';
import _ from 'lodash';
import config from '../../config';
export const SET_RECEIVED_LOVER_REQUESTS = 'received-lover-requests/set-received-lover-requests';
export const ACCEPT_LOVER_REQUEST = 'received-lover-requests/accept-lover-request';
export const CLEAR_RECEIVED_LOVER_REQUESTS = 'received-lover-requests/clear-received-lover-requests';

export const setReceivedLoverRequests = (rows, count) => ({
  type: SET_RECEIVED_LOVER_REQUESTS,
  rows,
  count,
});

export const getReceivedLoverRequests = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        receivedLoverRequests {
          rows {
            id
            sender {
              id email firstName lastName
            }
          }
          count
        }
      }`,
    });

    const receivedLoverRequests = _.at(res, 'body.data.receivedLoverRequests')[0];

    if (receivedLoverRequests) {
      dispatch(setReceivedLoverRequests(
        receivedLoverRequests.rows,
        receivedLoverRequests.count,
      ));
    }

    return res;
  } catch (err) {
    
    return err;
  }
};

export const acceptLoverRequest = loverRequestId => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        acceptLoverRequest(
          loverRequestId: "${loverRequestId}"
        ) {
          loverRequest {
            id isAccepted isSenderCanceled isRecipientCanceled createdAt
          }
          error
        }
      }`,
    });

    const loverRequest = _.get(res, 'body.data.acceptLoverRequest.loverRequest');

    if (_.isObject(loverRequest) && loverRequest.id) {
      dispatch({
        type: ACCEPT_LOVER_REQUEST,
        id: loverRequest.id,
        isAccepted: loverRequest.isAccepted,
        isSenderCanceled: loverRequest.isSenderCanceled,
        isRecipientCanceled: loverRequest.isRecipientCanceled,
        createdAt: loverRequest.createdAt,
      });
    }

    return res;
  } catch (err) {
    
    return err;
  }
};

export const clearReceivedLoverRequests = () => ({ type: CLEAR_RECEIVED_LOVER_REQUESTS });
