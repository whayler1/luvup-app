/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');

describe('Login', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  context('When login is correct and user is in a relationship', () => {
    it('should go to dashboard', async () => {
      await expect(element(by.id('login-title'))).toBeVisible();
      await element(by.id('login-email-input')).tap();
      await element(by.id('login-email-input')).typeText(
        'whayler1+bar@gmail.com'
      );
      await element(by.id('login-password-input')).typeText('Testing1234');
      await element(by.id('login-submit')).tap();
      await element(by.id('login-submit')).tap();

      await waitFor(element(by.id('relatioship-score-label')))
        .toBeVisible()
        .withTimeout(10000);
    });
  });

  context('When login is incorrect', () => {
    it('should show no email error', async () => {
      await element(by.id('login-submit')).tap();
      await waitFor(element(by.text('Please provide a valid email')))
        .toBeVisible()
        .withTimeout(3000);
    });

    it('should show no password error', async () => {
      await element(by.id('login-email-input')).tap();
      await element(by.id('login-email-input')).typeText(
        'whayler1+bar@gmail.com\n\n'
      );
      await waitFor(element(by.text('Please provide a password')))
        .toBeVisible()
        .withTimeout(3000);
    });

    it('should show email/password does not exist error', async () => {
      await element(by.id('login-email-input')).tap();
      await element(by.id('login-email-input')).typeText(
        'fakeyfake.fake@noemail.com\nwrongwrong\n'
      );
      await waitFor(element(by.text('Invalid email or password')))
        .toBeVisible()
        .withTimeout(3000);
    });
  });
});
