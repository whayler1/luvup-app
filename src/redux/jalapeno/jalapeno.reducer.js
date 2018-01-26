import _ from 'lodash';
import {
  SEND_JALAPENO,
  SET_SENT_JALAPENOS,
} from './jalapeno.actions';

const defaultState = {
  sentJalapenos: [],
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEND_JALAPENO:
      const count = _.isNull(state.count) ? 1 : state.count++;
      return {
        ...state,
        sentJalapenos: [action.jalapeno, ...state.sentJalapenos],
      };
    case SET_SENT_JALAPENOS:
      return {
        ...state,
        sentJalapenos: action.sentJalapenos
      };
    default:
      return state;
  }
}
