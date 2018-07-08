import _ from 'lodash';
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
import { GET_TIMELINE_DATA_SUCCESS } from '../user/user.actions';
import getRecentlySentTokenCount from '../../helpers/getRecentlySentTokenCount';

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
        recentlySentJalapenoCount: getRecentlySentTokenCount(state.sentJalapenos),
      };
    case SEND_JALAPENO_ATTEMPT:
      return {
        ...state,
        recentlySentJalapenoCount: getRecentlySentTokenCount(state.sentJalapenos) + 1,
      };
    case SEND_JALAPENO_SUCCESS:
      const sentJalapenos = [action.jalapeno, ...state.sentJalapenos];
      return {
        ...state,
        sentJalapenos,
        recentlySentJalapenoCount: getRecentlySentTokenCount(sentJalapenos),
      };
    case CREATE_LOVE_NOTE_SUCCESS:
      sentJalapenos = [...action.jalapenos, ...state.sentJalapenos];
      return {
        ...state,
        sentJalapenos,
        recentlySentJalapenoCount: getRecentlySentTokenCount(sentJalapenos),
      };
    case SET_SENT_JALAPENOS:
      return {
        ...state,
        sentJalapenos: action.sentJalapenos,
        sentJalapenosCount: action.sentJalapenosCount,
        recentlySentJalapenoCount: getRecentlySentTokenCount(action.sentJalapenos),
      };
    case SET_SENT_JALAPENOS_COUNT:
    case GET_TIMELINE_DATA_SUCCESS:
      return {
        ...state,
        sentJalapenosCount: action.sentJalapenosCount,
      };
    case GET_JALAPENO_COUNT:
      return {
        ...state,
        count: action.count,
      }
    case CLEAR_JALAPENO_COUNT:
      return {
        ...state,
        count: 0,
      }
    case SET_UNVIEWED_JALAPENO_COUNT:
      return {
        ...state,
        unviewedJalapenoCount: action.unviewedJalapenoCount,
      }
    default:
      return state;
  }
}
