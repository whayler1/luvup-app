import _ from 'lodash';
import {
  REQUEST_LOVER,
  SET_LOVER_REQUEST,
  CANCEL_LOVER_REQUEST,
} from './loverRequest.actions';

const defaultState = {
  id: '',
  isAccepted: '',
  isSenderCanceled: '',
  isRecipientCanceled: '',
  createdAt: '',
  username: '',
  firstName: '',
  lastName: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_LOVER:
    case SET_LOVER_REQUEST:
      return {
        ...state,
        ..._.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
          'username',
          'firstName',
          'lastName',
        ]),
      };
    case CANCEL_LOVER_REQUEST:
      return {
        ...state,
        ..._.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ]),
      };
    default:
      return state;
  }
};
