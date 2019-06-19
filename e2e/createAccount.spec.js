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
    // const [firstName, lastName] = moniker.split('-');
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
  });
});
