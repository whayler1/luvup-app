import superagent from 'superagent';
import config from '../../config';
import _ from 'lodash';
export const SET_RECEIVED_LOVER_REQUESTS = 'receivedLoverRequests/set-received-lover-requests';

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
