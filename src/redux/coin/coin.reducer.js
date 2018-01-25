import _ from 'lodash';
import {
  SEND_COIN,
  GET_COIN_COUNT,
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
        count,
      }
    default:
      return state;
  }
};
