import {
  SET_RECEIVED_LOVER_REQUESTS,
  ACCEPT_LOVER_REQUEST,
} from './receivedLoverRequests.actions';

const defaultState = {
  rows: null,
  count: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RECEIVED_LOVER_REQUESTS:
      return {
        ...state,
        rows: action.rows,
        count: action.count,
      };
      break;
    case ACCEPT_LOVER_REQUEST:
      const rows = [...state.rows];
      const loverRequestIndex = state.rows.findIndex(loverReq => loverReq.id === action.id);
      rows[loverRequestIndex] = {
        ...rows[loverRequestIndex],
        ..._.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
        ]),
      };
      return {
        ...state,
        rows,
      };
    default:
      return state;
  }
};
