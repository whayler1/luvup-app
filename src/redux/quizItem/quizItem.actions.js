import _ from 'lodash';
import { graphQlRequest } from '../../helpers';
import analytics from '../../services/analytics';

export const CREATE_QUIZ_ITEM_ATTEMPT = 'quiz-item/create-quiz-item-attempt';
export const CREATE_QUIZ_ITEM_SUCCESS = 'quiz-item/create-quiz-item-success';
export const CREATE_QUIZ_ITEM_FAILURE = 'quiz-item/create-quiz-item-failure';

export const createQuizItem = (
  question,
  reward,
  choices,
  senderChoiceIndex
) => async (dispatch, getState) => {
  dispatch({ type: CREATE_QUIZ_ITEM_ATTEMPT });
  const userId = getState().user.id;
  analytics.track({
    userId,
    event: CREATE_QUIZ_ITEM_ATTEMPT,
  });
  try {
    const choicesString = choices.map(choice => `"${choice}"`).join(',');
    const query = `mutation {
      createQuizItem(
        question: "${question}"
        reward: ${reward}
        choices: [${choicesString}]
        senderChoiceIndex: ${senderChoiceIndex}
      ) {
        quizItem { id }
      }
    }`;
    const data = await graphQlRequest(query);
    const quizItem = _.get(data, 'createQuizItem.quizItem', {});

    if (quizItem.id) {
      analytics.track({
        userId,
        event: CREATE_QUIZ_ITEM_SUCCESS,
      });
      dispatch({ type: CREATE_QUIZ_ITEM_SUCCESS });
    } else {
      const errorMessage = 'Error in create quiz response';
      analytics.track({
        userId,
        event: CREATE_QUIZ_ITEM_FAILURE,
        properties: {
          errorMessage,
        },
      });
      dispatch({
        type: CREATE_QUIZ_ITEM_FAILURE,
        errorMessage,
      });
    }
  } catch (err) {
    const errorMessage = err.message;
    analytics.track({
      userId,
      event: CREATE_QUIZ_ITEM_FAILURE,
      properties: {
        errorMessage,
      },
    });
    dispatch({ type: CREATE_QUIZ_ITEM_FAILURE, errorMessage });
  }
};
