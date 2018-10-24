import _ from 'lodash';
import {
  // CREATE_LOVE_NOTE_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_ATTEMPT,
  GET_RECEIVED_LOVE_NOTES_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_FAILURE,
  SET_LOVE_NOTE_READ_ATTEMPT,
  // SET_LOVE_NOTE_READ_SUCCESS,
  // SET_LOVE_NOTE_READ_FAILURE,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_ATTEMPT,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_SUCCESS,
  SET_LOVE_NOTES_READ_WITH_CREATED_AT_FAILURE,
} from './loveNote.actions';
import { GET_USER_EVENTS_SUCCESS } from '../userEvents/userEvents.actions';
import { ADD_NOTIFICATION } from '../notifications/notifications.actions';
import {
  GET_ME_SUCCESS,
  GET_TIMELINE_DATA_SUCCESS,
} from '../user/user.actions';

const defaultState = {
  isGetReceivedLoveNotesInFlight: false,
  getReceivedLoveNotesError: '',
  isSetLoveNotesReadWithCreatedAtInFlight: false,
  setLoveNotesReadWithCreatedAtFailure: '',
  receivedLoveNoteCount: 0,
  receivedLoveNotes: [],
  unreadReceivedLoveNoteCount: 0,
  loveNotes: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_RECEIVED_LOVE_NOTES_ATTEMPT:
      return {
        ...state,
        isGetReceivedLoveNotesInFlight: true,
        getReceivedLoveNotesError: '',
      };
    case GET_RECEIVED_LOVE_NOTES_SUCCESS: {
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
    }
    case GET_RECEIVED_LOVE_NOTES_FAILURE:
      return {
        ...state,
        isGetReceivedLoveNotesInFlight: false,
        getReceivedLoveNotesError: action.error,
      };
    case SET_LOVE_NOTE_READ_ATTEMPT: {
      const loveNoteIndex = state.loveNotes.findIndex(
        loveNote => loveNote.id === action.loveNoteId
      );
      const loveNote = {
        ...state.loveNote[action.loveNoteId],
        isRead: true,
      };
      const loveNotes = [
        ...state.loveNotes.slice(0, loveNoteIndex - 1),
        loveNote,
        ...state.loveNotes.slice(loveNoteIndex + 1, state.loveNotes.length - 1),
      ];
      return {
        ...state,
        loveNotes,
      };
    }
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
    case GET_ME_SUCCESS: {
      const unreadReceivedLoveNoteCount = _.get(
        action.data,
        'receivedLoveNotes.count',
        0
      );
      return {
        ...state,
        unreadReceivedLoveNoteCount,
      };
    }
    case ADD_NOTIFICATION: {
      const type = _.get(action, 'notification.data.type');
      let unreadReceivedLoveNoteCount = state.unreadReceivedLoveNoteCount;
      if (type === 'love-note') {
        unreadReceivedLoveNoteCount += 1;
      }
      return {
        ...state,
        unreadReceivedLoveNoteCount,
      };
    }
    case GET_USER_EVENTS_SUCCESS:
    case GET_TIMELINE_DATA_SUCCESS: {
      const loveNotes = action.shouldAppend
        ? [...state.loveNotes, ...action.loveNotes]
        : action.loveNotes;
      return {
        ...state,
        loveNotes,
      };
    }
    default:
      return state;
  }
}
