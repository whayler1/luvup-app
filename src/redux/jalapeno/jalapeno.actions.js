import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const SEND_JALAPENO = 'jalapeno/send-jalapeno';
export const SET_SENT_JALAPENOS = 'jalapeno/set-sent-jalapenos';

export const sendJalapeno = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        sendJalapeno {
          jalapeno {
            id isExpired createdAt
          }
        }
      }`,
    });

    const sendJalapeno = _.at(res, 'body.data.sendJalapeno')[0];
    console.log('sendJalapeno', sendJalapeno);

    if(_.isObject(sendJalapeno)) {
      dispatch({
        type: SEND_JALAPENO,
        jalapeno: sendJalapeno.jalapeno,
      });
    }

    return res;
  } catch (err) {
    console.log('sendJalapeno error', err);
    return err;
  }
};

export const setSentJalapenos = sentJalapenos => ({
  type: SET_SENT_JALAPENOS,
  sentJalapenos,
});
