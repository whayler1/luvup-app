import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const SEND_COIN = 'coin/send-coin';
export const GET_COIN_COUNT = 'coin/get-coin-count';

export const sendCoin = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        sendCoin {
          coin {
            id createdAt
          }
        }
      }`
    });

    const sendCoin = _.at(res, 'body.data.sendCoin')[0];
    console.log('--- sendCoin', sendCoin);

    if(_.isObject(sendCoin)) {
      dispatch({
        type: SEND_COIN,
        coin: sendCoin.coin,
      });
    }

    return res;
  } catch (err) {
    console.log('sendCoin err', err);
    return err;
  }
};

export const getCoinCount = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        coinCount {
          count
        }
      }`
    });

    const coinCount = _.at(res, 'body.data.coinCount')[0];

    if (_.isObject(coinCount)) {
      console.log('coinCount.count', coinCount.count);
      dispatch({
        type: GET_COIN_COUNT,
        count: coinCount.count,
      });
    }

    return res;
  } catch (err) {
    console.log('getCoinCount err', err);
    return err;
  }
}
