import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';

export const REFRESH_SENT_COIN_COUNT = 'coin/refresh-sent-coin-count';
export const SEND_COIN_ATTEMPT = 'coin/send-coin-attempt';
export const SEND_COIN_SUCCESS = 'coin/send-coin-success';
export const GET_COIN_COUNT = 'coin/get-coin-count';
export const CLEAR_COIN_COUNT = 'coin/clear-coin-count';
export const GET_SENT_COINS = 'coin/get-sent-coins';
export const SET_SENT_COINS = 'coin/set-sent-coins';
export const SET_SENT_COINS_COUNT = 'coin/set-sent-coins-count';
export const SET_UNVIEWED_COIN_COUNT = 'coin/set-unviewed-coin-count';

export const refreshSentCoinCount = () => ({ type: REFRESH_SENT_COIN_COUNT });

export const sendCoin = () => async dispatch => {
  dispatch({ type: SEND_COIN_ATTEMPT });

  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        sendCoin {
          coin { id createdAt }
          relationshipScore { score }
        }
      }`,
    });

    const sendCoin = _.get(res, 'body.data.sendCoin');
    // const relationshipScore = _.get(res, 'body.data.relationshipScore');
    // console.log('relationshipScore', relationshipScore);

    if (_.isObject(sendCoin) && _.isObject(sendCoin.relationshipScore)) {
      dispatch({
        type: SEND_COIN_SUCCESS,
        coin: sendCoin.coin,
        relationshipScore: sendCoin.relationshipScore,
      });
    }

    return res;
  } catch (err) {
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
      }`,
    });

    const coinCount = _.get(res, 'body.data.coinCount');

    if (_.isObject(coinCount)) {
      dispatch({
        type: GET_COIN_COUNT,
        count: coinCount.count,
      });
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const clearCoinCount = () => ({ type: CLEAR_COIN_COUNT });

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

    if (_.isObject(sentCoins)) {
      dispatch({
        type: GET_SENT_COINS,
        rows: sentCoins.rows,
        count: sentCoins.count,
      });
    }

    return res;
  } catch (err) {
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
