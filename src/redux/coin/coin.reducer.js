import _ from 'lodash';
import {
  SEND_COIN,
  GET_COIN_COUNT,
  SET_SENT_COINS,
} from './coin.actions';

const defaultState = {
  sentCoins: [],
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_COIN:
      const count = _.isNull(state.count) ? 1 : state.count++;
      return {
        ...state,
        count,
        sentCoins: [ action.coin, ...state.sentCoins ],
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
      }
    default:
      return state;
  }
};
