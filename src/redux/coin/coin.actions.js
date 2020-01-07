import _ from 'lodash';
import uuid from 'uuid/v1';

import coinApi from './coin.api';
import { updateSentCoins } from '../../services/storage';

export const REFRESH_SENT_COIN_COUNT = 'coin/refresh-sent-coin-count';
export const SEND_COIN_ATTEMPT = 'coin/send-coin-attempt';
export const SEND_COIN_SUCCESS = 'coin/send-coin-success';
export const GET_COIN_COUNT_ATTEMPT = 'coin/get-coin-count-attempt';
export const GET_COIN_COUNT_SUCCESS = 'coin/get-coin-count-success';
export const GET_COIN_COUNT_FAILURE = 'coin/get-coin-count-failure';
export const SET_UNVIEWED_COIN_COUNT = 'coin/set-unviewed-coin-count';

export const refreshSentCoinCount = () => ({ type: REFRESH_SENT_COIN_COUNT });

export const sendCoin = () => async (dispatch, getState) => {
  const placeholderCoinId = uuid();
  dispatch({
    type: SEND_COIN_ATTEMPT,
    placeholderCoinId,
  });

  try {
    const res = await coinApi.sendCoin();
    const sendCoin = _.get(res, 'body.data.sendCoin');

    if (_.isObject(sendCoin) && _.isObject(sendCoin.relationshipScore)) {
      await dispatch({
        type: SEND_COIN_SUCCESS,
        coin: sendCoin.coin,
        relationshipScore: sendCoin.relationshipScore,
        placeholderCoinId,
      });
      const { sentCoins } = getState().coin;
      updateSentCoins(sentCoins);
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const getCoinCount = () => async (dispatch) => {
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
        'Error getting coin count',
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

export const setUnviewedCoinCount = (unviewedCoinCount) => ({
  type: SET_UNVIEWED_COIN_COUNT,
  unviewedCoinCount,
});
