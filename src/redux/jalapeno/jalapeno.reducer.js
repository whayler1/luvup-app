import get from 'lodash/get';
import {
  REFRESH_SENT_JALAPENO_COUNT,
  SEND_JALAPENO_ATTEMPT,
  SEND_JALAPENO_SUCCESS,
  SET_SENT_JALAPENOS,
  SET_SENT_JALAPENOS_COUNT,
  GET_JALAPENO_COUNT,
  CLEAR_JALAPENO_COUNT,
  SET_UNVIEWED_JALAPENO_COUNT,
} from './jalapeno.actions';
import { CREATE_LOVE_NOTE_SUCCESS } from '../loveNote/loveNote.actions';
import {
  GET_TIMELINE_DATA_SUCCESS,
  GET_ME_SUCCESS,
  LOGOUT,
} from '../user/user.actions';
import { CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS } from '../loverRequest/loverRequest.actions';
import getRecentlySentTokenCount from '../../helpers/getRecentlySentTokenCount';

const generateFakeJalapenoWithId = (id) => ({
  id,
  createdAt: new Date().toString(),
  isExpired: false,
});

const defaultState = {
  recentlySentJalapenoCount: 0,
  sentJalapenos: [],
  sentJalapenosCount: null,
  count: null,
  unviewedJalapenoCount: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REFRESH_SENT_JALAPENO_COUNT:
      return {
        ...state,
        recentlySentJalapenoCount: getRecentlySentTokenCount(
          state.sentJalapenos,
        ),
      };
    case SEND_JALAPENO_ATTEMPT:
      return {
        ...state,
        sentJalapenos: [
          generateFakeJalapenoWithId(action.placeholderJalapenoId),
          ...state.sentJalapenos,
        ],
        recentlySentJalapenoCount:
          getRecentlySentTokenCount(state.sentJalapenos) + 1,
      };
    case SEND_JALAPENO_SUCCESS: {
      const sentJalapenos = [
        action.jalapeno,
        ...state.sentJalapenos.filter(
          (jalapeno) => jalapeno.id !== action.generateFakeJalapenoWithId,
        ),
      ];
      return {
        ...state,
        sentJalapenos,
        recentlySentJalapenoCount: getRecentlySentTokenCount(sentJalapenos),
      };
    }
    case CREATE_LOVE_NOTE_SUCCESS: {
      const sentJalapenos = [...action.jalapenos, ...state.sentJalapenos];
      return {
        ...state,
        sentJalapenos,
        recentlySentJalapenoCount: getRecentlySentTokenCount(sentJalapenos),
      };
    }
    case SET_SENT_JALAPENOS:
      return {
        ...state,
        sentJalapenos: action.sentJalapenos,
        sentJalapenosCount: action.sentJalapenosCount,
        recentlySentJalapenoCount: getRecentlySentTokenCount(
          action.sentJalapenos,
        ),
      };
    case SET_SENT_JALAPENOS_COUNT:
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        count: action.jalapenosCount,
        sentJalapenosCount: action.sentJalapenosCount,
      };
    case GET_JALAPENO_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case CLEAR_JALAPENO_COUNT:
      return {
        ...state,
        count: 0,
      };
    case SET_UNVIEWED_JALAPENO_COUNT:
      return {
        ...state,
        unviewedJalapenoCount: action.unviewedJalapenoCount,
      };
    case GET_ME_SUCCESS: {
      const sentJalapenos = get(action.data, 'sentJalapenos');
      if (sentJalapenos) {
        return {
          ...state,
          rows: sentJalapenos.rows,
          count: sentJalapenos.count,
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
