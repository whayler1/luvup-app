import _ from 'lodash';
import {
  REQUEST_LOVER,
} from './loverRequest.actions';

const defaultState = {
  id: '',
  isAccepted: '',
  isSenderCanceled: '',
  isRecipientCanceled: '',
  createdAt: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_LOVER:
      return {
        ...state,
        _.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ])
      };
    default:
      return state;
  }
};
