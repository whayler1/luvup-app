import _ from 'lodash';
import {
  SEND_COIN_ATTEMPT,
  SEND_COIN_SUCCESS,
  GET_COIN_COUNT,
  CLEAR_COIN_COUNT,
  SET_SENT_COINS,
  SET_SENT_COINS_COUNT,
  SET_UNVIEWED_COIN_COUNT,
} from './coin.actions';
import getRecentlySentTokenCount from '../../helpers/getRecentlySentTokenCount';

const defaultState = {
  recentlySentCoinCount: 0,
  sentCoins: [],
  sentCoinsCount: null,
  count: null,
  unviewedCoinCount: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_COIN_ATTEMPT:
      return {
        ...state,
        recentlySentCoinCount: state.recentlySentCoinCount + 1,
      }
    case SEND_COIN_SUCCESS:
      const sentCoins = [ action.coin, ...state.sentCoins ];
      return {
        ...state,
        sentCoins,
        recentlySentCoinCount: getRecentlySentTokenCount(sentCoins),
        sentCoinsCount: action.count,
      }
    case GET_COIN_COUNT:
      return {
        ...state,
        count: action.count,
      }
    case CLEAR_COIN_COUNT:
      return {
        ...state,
        count: 0,
      }
    case SET_SENT_COINS:
      return {
        ...state,
        sentCoins: action.sentCoins,
        sentCoinsCount: action.sentCoinsCount,
        recentlySentCoinCount: getRecentlySentTokenCount(action.sentCoins),
      }
    case SET_SENT_COINS_COUNT:
      return {
        ...state,
        sentCoinsCount: action.sentCoinsCount,
      }
    case SET_UNVIEWED_COIN_COUNT:
      return {
        ...state,
        unviewedCoinCount: action.unviewedCoinCount,
      }
    default:
      return state;
  }
};
