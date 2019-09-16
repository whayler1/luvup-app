import _ from 'lodash';
import uuid from 'uuid/v1';

import coinApi from './coin.api';

export const REFRESH_SENT_COIN_COUNT = 'coin/refresh-sent-coin-count';
export const SEND_COIN_ATTEMPT = 'coin/send-coin-attempt';
export const SEND_COIN_SUCCESS = 'coin/send-coin-success';
export const GET_COIN_COUNT_ATTEMPT = 'coin/get-coin-count-attempt';
export const GET_COIN_COUNT_SUCCESS = 'coin/get-coin-count-success';
export const GET_COIN_COUNT_FAILURE = 'coin/get-coin-count-failure';
export const CLEAR_COIN_COUNT = 'coin/clear-coin-count';
export const GET_SENT_COINS = 'coin/get-sent-coins';
export const SET_SENT_COINS = 'coin/set-sent-coins';
export const SET_SENT_COINS_COUNT = 'coin/set-sent-coins-count';
export const SET_UNVIEWED_COIN_COUNT = 'coin/set-unviewed-coin-count';

export const refreshSentCoinCount = () => ({ type: REFRESH_SENT_COIN_COUNT });

export const sendCoin = () => async dispatch => {
  const placeholderCoinId = uuid();
  dispatch({
    type: SEND_COIN_ATTEMPT,
    placeholderCoinId,
  });

  try {
    const res = await coinApi.sendCoin();
    const sendCoin = _.get(res, 'body.data.sendCoin');

    if (_.isObject(sendCoin) && _.isObject(sendCoin.relationshipScore)) {
      dispatch({
        type: SEND_COIN_SUCCESS,
        coin: sendCoin.coin,
        relationshipScore: sendCoin.relationshipScore,
        placeholderCoinId,
      });
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const getCoinCount = () => async dispatch => {
  dispatch({ type: GET_COIN_COUNT_ATTEMPT });
  try {
    const res = await coinApi.getCoinCount();
    const coinCount = _.get(res, 'body.data.coinCount');

    if (_.isObject(coinCount)) {
      dispatch({
        type: GET_COIN_COUNT_SUCCESS,
        count: coinCount.count,
      });
      return res;
    }
    dispatch({
      type: GET_COIN_COUNT_FAILURE,
      errorMessage: _.get(
        res,
        'body.errors[0].message',
        'Error getting coin count'
      ),
    });
  } catch (err) {
    dispatch({
      type: GET_COIN_COUNT_FAILURE,
      errorMessage: _.get(err, 'message', 'Error getting coin count'),
    });
    return err;
  }
};

export const clearCoinCount = () => ({ type: CLEAR_COIN_COUNT });

export const getSentCoins = (limit, offset) => async dispatch => {
  try {
    const res = await coinApi.getSentCoins(limit, offset);
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
