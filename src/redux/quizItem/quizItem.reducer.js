import {
  CREATE_QUIZ_ITEM_ATTEMPT,
  CREATE_QUIZ_ITEM_SUCCESS,
  CREATE_QUIZ_ITEM_FAILURE,
} from './quizItem.actions';

const defaultState = {
  isCreateQuizItemInFlight: false,
  createQuizItemErrorMessage: '',
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
    default:
      return state;
  }
}
