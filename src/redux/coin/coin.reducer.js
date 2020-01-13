import get from 'lodash/get';
import {
  REFRESH_SENT_COIN_COUNT,
  SEND_COIN_ATTEMPT,
  SEND_COIN_SUCCESS,
  GET_COIN_COUNT_ATTEMPT,
  GET_COIN_COUNT_SUCCESS,
  GET_COIN_COUNT_FAILURE,
  SET_UNVIEWED_COIN_COUNT,
} from './coin.actions';
import { CREATE_LOVE_NOTE_SUCCESS } from '../loveNote/loveNote.actions';
import {
  GET_TIMELINE_DATA_SUCCESS,
  GET_ME_SUCCESS,
  LOGOUT,
} from '../user/user.actions';
import { CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS } from '../loverRequest/loverRequest.actions';
import getRecentlySentTokenCount from '../../helpers/getRecentlySentTokenCount';

const defaultState = {
  recentlySentCoinCount: 0,
  sentCoins: [],
  sentCoinsCount: null,
  count: null,
  unviewedCoinCount: 0,
  isGetCoinCountInFlight: false,
  getCoinCountError: '',
};

const generateFakeCoinWithId = (id) => ({
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
        ...state.sentCoins.filter(
          (coin) => coin.id !== action.placeholderCoinId,
        ),
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
    case GET_COIN_COUNT_ATTEMPT:
      return {
        ...state,
        isGetCoinCountInFlight: true,
        getCoinCountError: '',
      };
    case GET_COIN_COUNT_SUCCESS:
      return {
        ...state,
        isGetCoinCountInFlight: false,
        count: action.count,
      };
    case GET_COIN_COUNT_FAILURE:
      return {
        ...state,
        isGetCoinCountInFlight: false,
        getCoinCountError: action.errorMessage,
      };
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
    case GET_ME_SUCCESS: {
      const sentCoins = get(action.data, 'sentCoins');
      const coinCount = get(action.data, 'coinCount');
      const unviewedEventCounts = get(action.data, 'unviewedEventCounts');
      if (sentCoins && coinCount && unviewedEventCounts) {
        return {
          ...state,
          rows: sentCoins.rows,
          count: coinCount.count,
          sentCoins: sentCoins.rows,
          sentCoinsCount: sentCoins.count,
          unviewedCoinCount: unviewedEventCounts.coinsReceived,
        };
      }
      return state;
    }
    case LOGOUT:
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}
