/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');
const uuidv1 = require('uuid/v1');
const Moniker = require('moniker');

import { login, elementById, elementByText } from './helpers';

const TIMEOUT = 3000;

// TODO: test sign up page properly handles new signup error shape
// res.errors[0].message

const createUser = async (username, userEmail, firstName, lastName) => {
  await waitFor(element(by.text('Login')))
    .toBeVisible()
    .withTimeout(TIMEOUT);
  const loginSignup = await elementById('login-signup');
  await loginSignup.tap();
  const signupEmailInput = await elementById('signup-email-input');
  await waitFor(signupEmailInput)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await signupEmailInput.tap();
  await signupEmailInput.typeText(`${userEmail}\n`);
  const inputNumber0 = await elementById('input-number-0');
  await waitFor(inputNumber0)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await inputNumber0.tap();
  await inputNumber0.typeText('012345');
  const createProfileUsernameInput = await elementById(
    'create-profile-username-input'
  );
  await waitFor(createProfileUsernameInput)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await createProfileUsernameInput.tap();
  // // TODO: make username not uuid
  await createProfileUsernameInput.typeText(`${username}\n`);
  await elementById('create-profile-firstname-input').typeText(
    `${firstName}\n`
  );
  await elementById('create-profile-lastname-input').typeText(`${lastName}\n`);
  await elementById('create-profile-password-input').typeText('Testing123\n');
  await elementById('create-profile-passwordagain-input').typeText(
    'Testing123\n'
  );
};

describe.only('onboarding', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  it('happy path', async () => {
    const uuid = uuidv1();
    const moniker = Moniker.choose();
    const [firstName, lastName] = moniker.split('-');
    const username = `${moniker}${uuid.substr(0, 5)}`;
    const userEmail = `justin+${username}@luvup.io`;
    await createUser(username, userEmail, firstName, lastName);

    const menuButton = elementById('dashboard-top-nav-menu-button');
    await waitFor(menuButton)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await menuButton.tap();

    let menuLogout = elementById('menu-logout');
    await waitFor(menuLogout)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await menuLogout.tap();
    await waitFor(elementByText('Login'))
      .toBeVisible()
      .withTimeout(TIMEOUT);

    const moniker2 = Moniker.choose();
    const [firstName2, lastName2] = moniker2.split('-');
    const username2 = `${moniker2}${uuid.substr(0, 5)}`;
    const userEmail2 = `justin+${username2}@luvup.io`;
    await createUser(username2, userEmail2, firstName2, lastName2);
    const loverRequestButton = await elementById(
      'dashboard-create-lover-request-button'
    );
    await waitFor(loverRequestButton)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await loverRequestButton.tap();
    const createLoverRequestInput = elementById('create-lover-request-input');
    await waitFor(createLoverRequestInput)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestInput.tap();
    await createLoverRequestInput.typeText(username);
    const createLoverRequestListItem = elementById(
      `create-lover-request-list-item-${username}`
    );
    await waitFor(createLoverRequestListItem)
      .toBeVisible()
      .withTimeout(6000);
    await createLoverRequestListItem.tap();
    await createLoverRequestListItem.tap();

    const createLoverRequestButton = elementById('create-lover-request-button');
    await waitFor(createLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestButton.tap();

    await waitFor(element(by.id('hero-lover-request-copy')))
      .toBeVisible()
      .withTimeout(3000);
    await elementById('dashboard-top-nav-menu-button').tap();

    menuLogout = elementById('menu-logout');
    await waitFor(menuLogout)
      .toBeVisible()
      .withTimeout(3000);
    await menuLogout.tap();
    await waitFor(elementByText('Login'))
      .toBeVisible()
      .withTimeout(3000);

    await login(userEmail, 'Testing123');

    const acceptLoverRequestButton = elementById('accept-lover-request-button');
    await waitFor(acceptLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await acceptLoverRequestButton.tap();

    await waitFor(elementById('hero-heart-view'))
      .toBeVisible()
      .withTimeout(6000);
    await expect(elementById('dashboard-top-nav-coin-count')).toBeVisible();
    await expect(elementById('dashboard-top-nav-history-button')).toBeVisible();
    await expect(
      elementById('dashboard-top-nav-relationship-score')
    ).toBeVisible();
    await expect(elementById('dashboard-top-nav-menu-button')).toBeVisible();
    await expect(elementById('dashboard-write-love-note-button')).toBeVisible();
    await expect(elementById('dashboard-create-a-quiz-button')).toBeVisible();
  });
});
