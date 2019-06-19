import uuidv1 from 'uuid/v1';
import Moniker from 'moniker';
import { reloadApp } from 'detox-expo-helpers';
// import times from 'lodash/times';

import {
  // login,
  elementById,
  // waitForElementById,
  // generateUser,
} from './helpers';

const TIMEOUT = 3000;

describe('create account', () => {
  beforeAll(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  it('can send and accept lover request', async () => {
    const uuid = uuidv1();
    const moniker = Moniker.choose();
    const [firstName, lastName] = moniker.split('-');
    const username = `${moniker}${uuid.substr(0, 5)}`;
    const userEmail = `justin+${username}@luvup.io`;
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
    await elementById('create-profile-lastname-input').typeText(
      `${lastName}\n`
    );
    await elementById('create-profile-lastname-input').swipe('up', 'fast', 0.5);
    await elementById('create-profile-password-input').tap();
    await elementById('create-profile-password-input').typeText('Testing123\n');
    await elementById('create-profile-passwordagain-input').typeText(
      'Testing123\n'
    );
    await waitFor(elementById('dashboard-create-lover-request-button'))
      .toBeVisible()
      .withTimeout(3000);
  });
});
