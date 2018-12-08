import React from 'react';
import ViewQuiz from './ViewQuiz';

import renderer from 'react-test-renderer';

const mockStore = {
  /* eslint-disable no-empty-function */
  subscribe: () => {},
  dispatch: () => {},
  /* eslint-disable no-empty-function */
  getState: () => ({
    user: {
      id: '234',
    },
    lover: {
      id: '456',
      firstName: 'Steve',
    },
    quizItem: {
      isAnswerQuizItemInFlight: false,
      answerQuizItemErrorMessage: '',

      quizItemDictionary: {
        '123': {
          senderId: '234',
          recipientId: '456',
          question: 'lorem ipsum',
          reward: 3,
          senderChoiceId: 'abc',
          recipientChoiceId: '',
          choices: [
            {
              id: 'abc',
              answer: 'meow',
            },
            {
              id: 'def',
              answer: 'foo',
            },
            {
              id: 'ghi',
              answer: 'baby',
            },
          ],
        },
      },
    },
  }),
};

it('renders without crashing', () => {
  const rendered = renderer
    .create(<ViewQuiz store={mockStore} quizItemId={'123'} />)
    .toJSON();

  expect(rendered).toMatchSnapshot();
});
