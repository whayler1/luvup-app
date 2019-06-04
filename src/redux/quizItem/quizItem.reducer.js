import {
  CREATE_QUIZ_ITEM_ATTEMPT,
  CREATE_QUIZ_ITEM_SUCCESS,
  CREATE_QUIZ_ITEM_FAILURE,
  ANSWER_QUIZ_ITEM_ATTEMPT,
  ANSWER_QUIZ_ITEM_SUCCESS,
  ANSWER_QUIZ_ITEM_FAILURE,
} from './quizItem.actions';
import { GET_USER_EVENTS_SUCCESS } from '../userEvents/userEvents.actions';
import { GET_TIMELINE_DATA_SUCCESS } from '../user/user.actions';

const defaultState = {
  isCreateQuizItemInFlight: false,
  createQuizItemErrorMessage: '',
  quizItemDictionary: {},
  isAnswerQuizItemInFlight: false,
  answerQuizItemErrorMessage: '',
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
    case ANSWER_QUIZ_ITEM_ATTEMPT:
      return {
        ...state,
        isAnswerQuizItemInFlight: true,
      };
    case ANSWER_QUIZ_ITEM_FAILURE:
      return {
        ...state,
        isAnswerQuizItemInFlight: false,
        answerQuizItemErrorMessage: action.errorMessage,
      };
    case ANSWER_QUIZ_ITEM_SUCCESS: {
      const quizItemDictionary = {
        ...state.quizItemDictionary,
        [action.quizItem.id]: action.quizItem,
      };
      return {
        ...state,
        isAnswerQuizItemInFlight: false,
        quizItemDictionary,
      };
    }
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
