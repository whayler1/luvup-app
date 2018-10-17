import {
  GET_USER_EVENTS_ATTEMPT,
  GET_USER_EVENTS_SUCCESS,
  GET_USER_EVENTS_FAILURE,
  SET_USER_EVENTS,
} from './userEvents.actions';
import {
  GET_TIMELINE_DATA_ATTEMPT,
  GET_TIMELINE_DATA_SUCCESS,
  GET_TIMELINE_DATA_FAILURE,
} from '../user/user.actions';

const defaultState = {
  isGetUserEventsInFlight: false,
  getUserEventsError: '',
  rows: [],
  count: null,
};

const getDecoratedRows = (rows, loveNoteEvents, loveNotes) =>
  rows.map(row => {
    const loveNoteEvent = loveNoteEvents.find(
      loveNoteEvent => loveNoteEvent.userEventId === row.id
    );

    if (loveNoteEvent) {
      const loveNote = loveNotes.find(
        loveNote => loveNote.id === loveNoteEvent.loveNoteId
      );
      return { ...row, loveNote };
    }
    return row;
  });

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_USER_EVENTS_ATTEMPT:
    case GET_TIMELINE_DATA_ATTEMPT:
      return {
        ...state,
        isGetUserEventsInFlight: true,
        getUserEventsError: '',
      };
    case GET_USER_EVENTS_SUCCESS:
    case SET_USER_EVENTS:
    case GET_TIMELINE_DATA_SUCCESS: {
      const initialRows = action.shouldAppend
        ? [...state.rows, ...action.rows]
        : action.rows;
      const rows = getDecoratedRows(
        initialRows,
        action.loveNoteEvents || [],
        action.loveNotes || []
      );
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: '',
        rows,
        count: action.count,
      };
    }
    case GET_USER_EVENTS_FAILURE:
    case GET_TIMELINE_DATA_FAILURE:
      return {
        ...state,
        isGetUserEventsInFlight: false,
        getUserEventsError: action.error,
      };
    default:
      return state;
  }
}
