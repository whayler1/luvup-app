/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');
const uuidv1 = require('uuid/v1');
const Moniker = require('moniker');

import { login } from './helpers';

const TIMEOUT = 3000;

// TODO: test sign up page properly handles new signup error shape
// res.errors[0].message

const createUser = async (username, userEmail, firstName, lastName) => {
  await waitFor(element(by.text('Login')))
    .toBeVisible()
    .withTimeout(TIMEOUT);
  const loginSignup = await element(by.id('login-signup')).atIndex(0);
  await loginSignup.tap();
  const signupEmailInput = await element(by.id('signup-email-input')).atIndex(
    0
  );
  await waitFor(signupEmailInput)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await signupEmailInput.tap();
  await signupEmailInput.typeText(`${userEmail}\n`);
  const inputNumber0 = await element(by.id('input-number-0')).atIndex(0);
  await waitFor(inputNumber0)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await inputNumber0.tap();
  await inputNumber0.typeText('012345');
  const createProfileUsernameInput = await element(
    by.id('create-profile-username-input')
  ).atIndex(0);
  await waitFor(createProfileUsernameInput)
    .toBeVisible()
    .withTimeout(TIMEOUT);
  await createProfileUsernameInput.tap();
  // // TODO: make username not uuid
  await createProfileUsernameInput.typeText(`${username}\n`);
  await element(by.id('create-profile-firstname-input'))
    .atIndex(0)
    .typeText(`${firstName}\n`);
  await element(by.id('create-profile-lastname-input'))
    .atIndex(0)
    .typeText(`${lastName}\n`);
  await element(by.id('create-profile-password-input'))
    .atIndex(0)
    .typeText('Testing123\n');
  await element(by.id('create-profile-passwordagain-input'))
    .atIndex(0)
    .typeText('Testing123\n');
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

    const menuButton = element(by.id('dashboard-top-nav-menu-button'));
    await waitFor(menuButton)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await menuButton.tap();

    let menuLogout = element(by.id('menu-logout'));
    await waitFor(menuLogout)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await menuLogout.tap();
    await waitFor(element(by.text('Login')))
      .toBeVisible()
      .withTimeout(TIMEOUT);

    const moniker2 = Moniker.choose();
    const [firstName2, lastName2] = moniker2.split('-');
    const username2 = `${moniker2}${uuid.substr(0, 5)}`;
    const userEmail2 = `justin+${username2}@luvup.io`;
    await createUser(username2, userEmail2, firstName2, lastName2);
    const loverRequestButton = await element(
      by.id('dashboard-create-lover-request-button')
    ).atIndex(0);
    await waitFor(loverRequestButton)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await loverRequestButton.tap();
    const createLoverRequestInput = element(
      by.id('create-lover-request-input')
    ).atIndex(0);
    await waitFor(createLoverRequestInput)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestInput.tap();
    await createLoverRequestInput.typeText(username);
    const createLoverRequestListItem = element(
      by.id(`create-lover-request-list-item-${username}`)
    ).atIndex(0);
    await waitFor(createLoverRequestListItem)
      .toBeVisible()
      .withTimeout(6000);
    await createLoverRequestListItem.tap();
    await createLoverRequestListItem.tap();

    const createLoverRequestButton = element(
      by.id('create-lover-request-button')
    ).atIndex(0);
    await waitFor(createLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestButton.tap();

    await waitFor(element(by.id('hero-lover-request-copy')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('dashboard-top-nav-menu-button'))
      .atIndex(0)
      .tap();

    menuLogout = element(by.id('menu-logout')).atIndex(0);
    await waitFor(menuLogout)
      .toBeVisible()
      .withTimeout(3000);
    await menuLogout.tap();
    await waitFor(element(by.text('Login')))
      .toBeVisible()
      .withTimeout(3000);

    await login(userEmail, 'Testing123');

    const acceptLoverRequestButton = element(
      by.id('accept-lover-request-button')
    ).atIndex(0);
    await waitFor(acceptLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await acceptLoverRequestButton.tap();

    await waitFor(element(by.id('hero-heart-view')).atIndex(0))
      .toBeVisible()
      .withTimeout(6000);
    await expect(
      element(by.id('dashboard-top-nav-coin-count')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.id('dashboard-top-nav-history-button')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.id('dashboard-top-nav-relationship-score')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.id('dashboard-top-nav-menu-button')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.id('dashboard-write-love-note-button')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.id('dashboard-create-a-quiz-button')).atIndex(0)
    ).toBeVisible();
  });
});
