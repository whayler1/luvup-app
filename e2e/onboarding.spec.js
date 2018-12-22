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
    const uuid = uuidv1();
    const userEmail = `justin+${uuid}@luvup.io`;
    await expect(element(by.id('login-title'))).toBeVisible();
    await element(by.id('login-signup')).tap();
    await waitFor(element(by.id('signup-email-input')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('signup-email-input')).tap();
    await element(by.id('signup-email-input')).typeText(`${userEmail}\n`);
    await waitFor(element(by.id('confirm-usercode-code-input')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('confirm-usercode-code-input')).tap();
    await element(by.id('confirm-usercode-code-input')).typeText('012345');
    await element(by.id('confirm-usercode-title')).tap();
    await element(by.id('confirm-usercode-submit')).tap();
    await waitFor(element(by.id('create-profile-username-input')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('create-profile-username-input')).tap();
    await element(by.id('create-profile-username-input')).typeText(`${uuid}\n`);
    await element(by.id('create-profile-firstname-input')).typeText('fake\n');
    await element(by.id('create-profile-lastname-input')).typeText('user\n');
    await element(by.id('create-profile-password-input')).typeText(
      'testing123\n'
    );
    await element(by.id('create-profile-passwordagain-input')).typeText(
      'testing123\n'
    );
  });
});
