/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');
const uuidv1 = require('uuid/v1');
// const { login } = require('./helpers');

describe.only('onboarding', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  it('happy path', async () => {
    const userEmail = `justin+${uuidv1()}@luvup.io`;
    await expect(element(by.id('login-title'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('signup-email-input')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('signup-email-input')).tap();
    await element(by.id('signup-email-input')).typeText(`${userEmail}\n`);
  });
});
