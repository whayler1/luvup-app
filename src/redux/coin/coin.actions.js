import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const SEND_COIN = 'coin/send-coin';
export const GET_COIN_COUNT = 'coin/get-coin-count';
export const GET_SENT_COINS = 'coin/get-sent-coins';
export const SET_SENT_COINS = 'coin/set-sent-coins';
export const SET_SENT_COINS_COUNT = 'coin/set-sent-coins-count';
export const SET_UNVIEWED_COIN_COUNT = 'coin/set-unviewed-coin-count';

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

export const getSentCoins = (limit, offset) => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        sentCoins(
          limit: "${limit}"
          offset: "${offset}"
        ) {
          rows {
            id createdAt
          }
          count
        }
      }`,
    });

    const sentCoins = _.at(res, 'body.data.sentCoins')[0];

    if (_.isObject(coinCount)) {
      dispatch({
        type: GET_SENT_COINS,
        rows: coinCount.rows,
        count: coinCount.count,
      });
    }

    return res;
  } catch (err) {
    console.log('getSentCoins err', err);
    return err;
  }
};

export const setSentCoins = (sentCoins, sentCoinsCount) => ({
  type: SET_SENT_COINS,
  sentCoins,
  sentCoinsCount,
});

export const setSentCoinsCount = sentCoinsCount => ({
  type: SET_SENT_COINS_COUNT,
  sentCoinsCount,
});

export const setUnviewedCoinCount = unviewedCoinCount => ({
  type: SET_UNVIEWED_COIN_COUNT,
  unviewedCoinCount,
});
