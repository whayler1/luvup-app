/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');

describe('Login', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  context('When login is correct', () => {
    it('should have welcome screen', async () => {
      await expect(element(by.id('login_title'))).toBeVisible();
      await element(by.id('login-email-input')).tap();
      await element(by.id('login-email-input')).typeText(
        'whayler1+bar@gmail.com'
      );
      await element(by.id('login-password-input')).typeText('Testing1234');
      await element(by.id('login-submit')).tap();
    });
  });

  xit('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(element(by.label('Hello!!!'))).toBeVisible();
  });

  xit('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.label('World!!!'))).toBeVisible();
  });
});
