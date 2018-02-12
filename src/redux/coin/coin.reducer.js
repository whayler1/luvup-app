import _ from 'lodash';
import {
  SEND_COIN,
  GET_COIN_COUNT,
  SET_SENT_COINS,
  SET_SENT_COINS_COUNT,
  SET_UNVIEWED_COIN_COUNT,
} from './coin.actions';

const defaultState = {
  sentCoins: [],
  sentCoinsCount: null,
  count: null,
  unviewedCoinCount: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_COIN:
      return {
        ...state,
        sentCoins: [ action.coin, ...state.sentCoins ],
        sentCoinsCount: action.count,
      }
    case GET_COIN_COUNT:
      return {
        ...state,
        count: action.count,
      }
    case SET_SENT_COINS:
      return {
        ...state,
        sentCoins: action.sentCoins,
        sentCoinsCount: action.sentCoinsCount,
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
