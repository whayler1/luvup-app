import {
  CREATE_QUIZ_ITEM_ATTEMPT,
  CREATE_QUIZ_ITEM_SUCCESS,
  CREATE_QUIZ_ITEM_FAILURE,
} from './quizItem.actions';
import { GET_USER_EVENTS_SUCCESS } from '../userEvents/userEvents.actions';
import { GET_TIMELINE_DATA_SUCCESS } from '../user/user.actions';

const defaultState = {
  isCreateQuizItemInFlight: false,
  createQuizItemErrorMessage: '',
  quizItemDictionary: {},
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_QUIZ_ITEM_ATTEMPT:
      return {
        ...state,
        isCreateQuizItemInFlight: true,
        createQuizItemErrorMessage: '',
      };
    case CREATE_QUIZ_ITEM_SUCCESS:
      return {
        ...state,
        isCreateQuizItemInFlight: false,
        createQuizItemErrorMessage: '',
      };
    case CREATE_QUIZ_ITEM_FAILURE:
      return {
        ...state,
        isCreateQuizItemInFlight: false,
        createQuizItemErrorMessage: action.errorMessage,
      };
    case GET_USER_EVENTS_SUCCESS:
    case GET_TIMELINE_DATA_SUCCESS: {
      if (!action.quizItems.length) {
        return state;
      }
      const newQuizItemDictionary = action.quizItems.reduce(
        (accumulator, quizItem) => ({
          ...accumulator,
          [quizItem.id]: quizItem,
        }),
        {}
      );
      // console.log('\n\n newQuizItemDictionary', newQuizItemDictionary);
      return {
        ...state,
        quizItemDictionary: {
          ...state.quizItemDictionary,
          ...newQuizItemDictionary,
        },
      };
    }
    default:
      return state;
  }
}
