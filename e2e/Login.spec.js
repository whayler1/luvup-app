/* eslint-disable import/no-commonjs */
import { reloadApp } from 'detox-expo-helpers';
import { generateRelationship, login } from './helpers';

describe('login', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  describe('When login is correct and user is in a relationship', () => {
    it('should go to dashboard and be able to logout', async () => {
      const { user } = await generateRelationship();
      await expect(element(by.id('login-title'))).toBeVisible();
      await login(user.email, user.password);

      await waitFor(element(by.id('relatioship-score-label')))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id('dashboard-top-nav-menu-button')).tap();
      await element(by.id('menu-logout')).tap();
      await element(by.id('menu-logout')).tap();
      await waitFor(element(by.id('login-title')))
        .toBeVisible()
        .withTimeout(3000);
    });

    it('should remain logged in on reload', async () => {
      const { user } = await generateRelationship();
      await expect(element(by.id('login-title'))).toBeVisible();
      await login(user.email, user.password);

      await waitFor(element(by.id('relatioship-score-label')))
        .toBeVisible()
        .withTimeout(5000);

      await reloadApp({
        permissions: { location: 'always', notifications: 'YES' },
      });

      await waitFor(element(by.id('relatioship-score-label')))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id('dashboard-top-nav-menu-button')).tap();
      await element(by.id('menu-logout')).tap();
      await element(by.id('menu-logout')).tap();
      await waitFor(element(by.id('login-title')))
        .toBeVisible()
        .withTimeout(3000);
    });
  });

  describe('When login is incorrect', () => {
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
