import { reloadApp } from 'detox-expo-helpers';
import { elementById, generateRelationship, login } from './helpers';

const TIMEOUT = 3000;

const quizButton = () => elementById('dashboard-create-a-quiz-button');
const questionInput = () => elementById('create-quiz-question-input');
const quizNextButton = () => elementById('create-quiz-next');
const quizChoiceInput = index =>
  elementById(`create-quiz-choice-input-${index}`);
const quizChoiceCheckbox = index =>
  elementById(`create-quiz-choice-checkbox-${index}`);
const quizChoiceNextButton = () => elementById('create-quiz-choice-next');
const rewardButton = index => elementById(`create-quiz-reward-button-${index}`);
const reviewButton = () => elementById('create-quiz-review-button');
const createQuizSubmitButton = () => elementById('create-quiz-submit-button');
const doneButton = () => elementById('create-quiz-done-button');
const historyNavButton = () => elementById('dashboard-top-nav-history-button');
const menuButton = () => elementById('dashboard-top-nav-menu-button');
const logoutButton = () => elementById('menu-logout');
const loginTitle = () => elementById('login-title');
const timelineItem0 = () => elementById('timeline-item-0');
const quizAnswer1 = () => elementById('quiz-display-answer-1');
const quizAnswerSubmit = () => elementById('view-quiz-submit');
const quizSuccessDone = () => elementById('view-quiz-success-done');
const coinCount = () => elementById('dashboard-top-nav-coin-count');

describe('quiz', () => {
  let user;
  let lover;

  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  beforeAll(async () => {
    const relationship = await generateRelationship();
    user = relationship.user;
    lover = relationship.lover;
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

    await waitFor(rewardButton(1))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await rewardButton(1).tap();
    await reviewButton().tap();

    await waitFor(createQuizSubmitButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await createQuizSubmitButton().tap();

    await waitFor(doneButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await doneButton().tap();

    await waitFor(menuButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await menuButton().tap();

    await waitFor(logoutButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await logoutButton().tap();

    await waitFor(loginTitle())
      .toBeVisible()
      .withTimeout(TIMEOUT);

    await login(lover.email, lover.password);

    await waitFor(historyNavButton())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await historyNavButton().tap();

    await waitFor(timelineItem0())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await timelineItem0().tap();

    await waitFor(quizAnswer1())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await quizAnswer1().tap();
    await quizAnswerSubmit().tap();

    await waitFor(quizSuccessDone())
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await quizSuccessDone().tap();

    await waitFor(coinCount())
      .toBeVisible()
      .withTimeout(TIMEOUT);
  });
});
