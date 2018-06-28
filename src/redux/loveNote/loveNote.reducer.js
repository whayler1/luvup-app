import _ from 'lodash';
import {
  // CREATE_LOVE_NOTE_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_ATTEMPT,
  GET_RECEIVED_LOVE_NOTES_SUCCESS,
  GET_RECEIVED_LOVE_NOTES_FAILURE,
} from './loveNote.actions';

const defaultState = {
  isGetReceivedLoveNotesInFlight: false,
  getReceivedLoveNotesError: '',
  receivedLoveNoteCount: 0,
  receivedLoveNotes: [],
};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
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
    default:
      return state;
  }
};
