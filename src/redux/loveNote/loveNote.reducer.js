import _ from 'lodash';
import {
  // CREATE_LOVE_NOTE_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_ATTEMPT,
  GET_RECEIVED_LOVE_NOTES_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_FAILURE,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE,
} from './loveNote.actions';
import { ADD_NOTIFICATION } from '../notifications/notifications.actions';
import { GET_ME_SUCCESS } from '../user/user.actions';

const defaultState = {
  isGetReceivedLoveNotesInFlight: false,
  getReceivedLoveNotesError: '',
  isSetLoveNotesReadWithCreatedAtInFlight: false,
  setLoveNotesReadWithCreatedAtFailure: '',
  receivedLoveNoteCount: 0,
  receivedLoveNotes: [],
  unreadReceivedLoveNoteCount: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_RECEIVED_LOVE_NOTES_ATTEMPT:
      return {
        ...state,
        isGetReceivedLoveNotesInFlight: true,
        getReceivedLoveNotesError: '',
      };
    case GET_RECEIVED_LOVE_NOTES_SUCCESS:
      let receivedLoveNotes;
      if (action.shouldAppend === true) {
        receivedLoveNotes = [...state.receivedLoveNotes, ...action.rows];
      } else {
        receivedLoveNotes = action.rows;
      }
      return {
        ...state,
        isGetReceivedLoveNotesInFlight: false,
        receivedLoveNoteCount: action.count,
        receivedLoveNotes,
      };
    case GET_RECEIVED_LOVE_NOTES_FAILURE:
      return {
        ...state,
        isGetReceivedLoveNotesInFlight: false,
        getReceivedLoveNotesError: action.error,
      };
    case SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT:
      return {
        ...state,
        isSetLoveNotesReadWithCreatedAtInFlight: true,
        setLoveNotesReadWithCreatedAtFailure: '',
      };
    case SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS:
      return {
        ...state,
        isSetLoveNotesReadWithCreatedAtInFlight: false,
        unreadReceivedLoveNoteCount: 0,
      };
    case SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE:
      return {
        ...state,
        isSetLoveNotesReadWithCreatedAtInFlight: true,
        setLoveNotesReadWithCreatedAtFailure: action.error,
      };
    case GET_ME_SUCCESS:
      let unreadReceivedLoveNoteCount = _.get(
        action.data,
        'receivedLoveNotes.count',
        0
      );
      return {
        ...state,
        unreadReceivedLoveNoteCount,
      };
    case ADD_NOTIFICATION:
      const type = _.get(action, 'notification.data.type');
      unreadReceivedLoveNoteCount = state.unreadReceivedLoveNoteCount;
      if (type === 'love-note') {
        unreadReceivedLoveNoteCount = unreadReceivedLoveNoteCount + 1;
      }
      return {
        ...state,
        unreadReceivedLoveNoteCount,
      };
    default:
      return state;
  }
}
