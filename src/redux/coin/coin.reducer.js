import {
  REFRESH_SENT_COIN_COUNT,
  SEND_COIN_ATTEMPT,
  SEND_COIN_SUCCESS,
  GET_COIN_COUNT,
  CLEAR_COIN_COUNT,
  SET_SENT_COINS,
  SET_SENT_COINS_COUNT,
  SET_UNVIEWED_COIN_COUNT,
} from './coin.actions';
import { CREATE_LOVE_NOTE_SUCCESS } from '../loveNote/loveNote.actions';
import { GET_TIMELINE_DATA_SUCCESS, LOGOUT } from '../user/user.actions';
import { CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS } from '../loverRequest/loverRequest.actions';
import getRecentlySentTokenCount from '../../helpers/getRecentlySentTokenCount';

const defaultState = {
  recentlySentCoinCount: 0,
  sentCoins: [],
  sentCoinsCount: null,
  count: null,
  unviewedCoinCount: 0,
};

const generateFakeCoinWithId = id => ({
  id,
  createdAt: new Date().toString(),
  isUsed: false,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REFRESH_SENT_COIN_COUNT:
      return {
        ...state,
        recentlySentCoinCount: getRecentlySentTokenCount(state.sentCoins),
      };
    case SEND_COIN_ATTEMPT:
      return {
        ...state,
        sentCoins: [
          generateFakeCoinWithId(action.placeholderCoinId),
          ...state.sentCoins,
        ],
        recentlySentCoinCount: getRecentlySentTokenCount(state.sentCoins) + 1,
      };
    case SEND_COIN_SUCCESS: {
      const sentCoins = [
        action.coin,
        ...state.sentCoins.filter(coin => coin.id !== action.placeholderCoinId),
      ];
      return {
        ...state,
        sentCoins,
        recentlySentCoinCount: getRecentlySentTokenCount(sentCoins),
        sentCoinsCount: action.count,
      };
    }
    case CREATE_LOVE_NOTE_SUCCESS: {
      const sentCoins = [...action.luvups, ...state.sentCoins];
      return {
        ...state,
        sentCoins,
        recentlySentCoinCount: getRecentlySentTokenCount(sentCoins),
      };
    }
    case GET_COIN_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case CLEAR_COIN_COUNT:
      return {
        ...state,
        count: 0,
      };
    case SET_SENT_COINS:
      return {
        ...state,
        sentCoins: action.sentCoins,
        sentCoinsCount: action.sentCoinsCount,
        recentlySentCoinCount: getRecentlySentTokenCount(action.sentCoins),
      };
    case SET_SENT_COINS_COUNT:
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        count: action.coinCount,
        sentCoinsCount: action.sentCoinsCount,
      };
    case SET_UNVIEWED_COIN_COUNT:
      return {
        ...state,
        unviewedCoinCount: action.unviewedCoinCount,
      };
    case LOGOUT:
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}
