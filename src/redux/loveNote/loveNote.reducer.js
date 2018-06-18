import _ from 'lodash';
import {
  CREATE_LOVE_NOTE,
} from './loveNote.reducer';

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case CREATE_LOVE_NOTE:
    default:
      return state;
  }
};
