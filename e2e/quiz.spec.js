import { reloadApp } from 'detox-expo-helpers';
import {
  elementById,
  // elementByText,
  generateRelationship,
  login,
} from './helpers';

const TIMEOUT = 3000;

const quizButton = () => elementById('dashboard-create-a-quiz-button');
const questionInput = () => elementById('create-quiz-question-input');
const quizNextButton = () => elementById('create-quiz-next');
const quizChoiceInput = index =>
  elementById(`create-quiz-choice-input-${index}`);
const quizChoiceCheckbox = index =>
  elementById(`create-quiz-choice-checkbox-${index}`);
const quizChoiceNextButton = () => elementById('create-quiz-choice-next');

describe('quiz', () => {
  let user;
  // let lover;

  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  beforeAll(async () => {
    const relationship = await generateRelationship();
    user = relationship.user;
    // lover = relationship.lover;
  });

  it('should be able send a quiz', async () => {
    await login(user.email, user.password);

    await waitFor(quizButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await quizButton().tap();

    await waitFor(questionInput())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await questionInput().tap();
    await questionInput().typeText('What do you think of something');
    await quizNextButton().tap();

    await waitFor(quizChoiceInput(0))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await quizChoiceInput(0).tap();
    await quizChoiceInput(0).typeText('Choice one');
    await quizChoiceInput(1).tap();
    await quizChoiceInput(1).typeText('Choice two');
    await quizChoiceInput(2).tap();
    await quizChoiceInput(2).typeText('Choice three');
    await quizChoiceCheckbox(1).tap();
    await quizChoiceCheckbox(1).tap();
    await quizChoiceNextButton().tap();
  });
});
