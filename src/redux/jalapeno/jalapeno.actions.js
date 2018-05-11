import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const SEND_JALAPENO = 'jalapeno/send-jalapeno';
export const SET_SENT_JALAPENOS = 'jalapeno/set-sent-jalapenos';
export const SET_SENT_JALAPENOS_COUNT = 'jalapeno/set-sent-jalapenos-count';
export const GET_JALAPENO_COUNT = 'jalapeno/get-jalapeno-count';
export const CLEAR_JALAPENO_COUNT = 'jalapeno/clear-jalapeno-count';
export const SET_UNVIEWED_JALAPENO_COUNT = 'jalapeno/set-unviewed-jalapeno-count';

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
    

    if(_.isObject(sendJalapeno)) {
      dispatch({
        type: SEND_JALAPENO,
        jalapeno: sendJalapeno.jalapeno,
      });
    }

    return res;
  } catch (err) {
    
    return err;
  }
};

export const setSentJalapenos = (sentJalapenos, sentJalapenosCount) => ({
  type: SET_SENT_JALAPENOS,
  sentJalapenos,
  sentJalapenosCount,
});

export const setSentJalapenosCount = sentJalapenosCount => ({
  type: SET_SENT_JALAPENOS_COUNT,
  sentJalapenosCount,
});

export const getJalapenoCount = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        jalapenos(limit: 0) { count }
      }`,
    });

    const jalapenos = _.get(res, 'body.data.jalapenos');
    

    if(_.isObject(jalapenos)) {
      dispatch({
        type: GET_JALAPENO_COUNT,
        count: jalapenos.count,
      });
    }

    return res;
  } catch (err) {
    
    return err;
  }
};

export const clearJalapenoCount = () => ({ type: CLEAR_JALAPENO_COUNT });

export const setUnviewedJalapenoCount = unviewedJalapenoCount => ({
  type: SET_UNVIEWED_JALAPENO_COUNT,
  unviewedJalapenoCount,
});
