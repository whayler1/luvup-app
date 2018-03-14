import superagent from 'superagent';
import config from '../../config';
import _ from 'lodash';
export const SET_RECEIVED_LOVER_REQUESTS = 'received-lover-requests/set-received-lover-requests';
export const ACCEPT_LOVER_REQUEST = 'received-lover-requests/accept-lover-request';

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
    console.log('\n\n', { receivedLoverRequests });

    if (receivedLoverRequests) {
      dispatch(setReceivedLoverRequests(
        receivedLoverRequests.rows,
        receivedLoverRequests.count,
      ));
    }

    return res;
  } catch (err) {
    console.log('getReceivedLoverRequests err', err);
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

    const loverRequest = _.at(res, 'body.data.acceptLoverRequest.loverRequest')[0];

    if (_.isObject(loverRequest) && loverRequest.id) {
      dispatch({
        type: ACCEPT_LOVER_REQUEST,
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
    console.log('acceptLoverRequest err', err);
    return err;
  }
};
