import _ from 'lodash';
import {
  SEND_JALAPENO,
  SET_SENT_JALAPENOS,
  SET_SENT_JALAPENOS_COUNT,
  GET_JALAPENO_COUNT,
  CLEAR_JALAPENO_COUNT,
  SET_UNVIEWED_JALAPENO_COUNT,
} from './jalapeno.actions';

const defaultState = {
  sentJalapenos: [],
  sentJalapenosCount: null,
  count: null,
  unviewedJalapenoCount: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_JALAPENO:
      return {
        ...state,
        sentJalapenos: [action.jalapeno, ...state.sentJalapenos],
      };
    case SET_SENT_JALAPENOS:
      return {
        ...state,
        sentJalapenos: action.sentJalapenos,
        sentJalapenosCount: action.sentJalapenosCount,
      };
    case SET_SENT_JALAPENOS_COUNT:
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
