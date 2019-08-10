import { reloadApp } from 'detox-expo-helpers';
import { elementById, elementByText, generateUser } from './helpers';
import Timeout from 'await-timeout';

describe('forgotten password', () => {
  let user;

  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  beforeAll(async () => {
    user = await generateUser();
  });

  it('should be able to log in through forgotten password ux', async () => {
    const forgotPasswordEl = element(by.label('Forgot your password'));
    const forgotPasswordEmailEl = element(by.id('forgot-password-email-input'));
    const forgotPasswordSubmit = element(by.id('forgot-password-submit'));
    const forgotPasswordLoginButton = element(
      by.id('forgot-password-login-button')
    );

    const loginEmailInput = element(by.id('login-email-input'));
    const loginPasswordInput = element(by.id('login-password-input'));
    const resetPasswordInput = element(
      by.id('reset-password-with-generated-password-new-password')
    );
    const resetPasswordDoneButton = element(
      by.id('reset-password-success-done-button')
    );
    const menuLogout = elementById('menu-logout');

    await forgotPasswordEl.tap();
    await forgotPasswordEmailEl.tap();
    await forgotPasswordEmailEl.typeText(user.email);
    await forgotPasswordSubmit.tap();
    await Timeout.set(500);
    await forgotPasswordLoginButton.tap();

    await Timeout.set(500);
    await loginEmailInput.atIndex(0).tap();
    await loginEmailInput.atIndex(0).typeText(user.email);
    await loginPasswordInput.atIndex(0).tap();
    await loginPasswordInput.atIndex(0).typeText('abc123abc\n');
    await Timeout.set(500);
    await resetPasswordInput.tap();
    await resetPasswordInput.typeText('NewPassword123\nNewPassword123\n');
    await resetPasswordDoneButton.tap();

    await waitFor(elementByText('Search for your lover'))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id('dashboard-top-nav-menu-button')).atIndex(0))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('dashboard-top-nav-menu-button'))
      .atIndex(0)
      .tap();
    await menuLogout.tap();

    await waitFor(loginEmailInput).toBeVisible();
    await loginEmailInput.tap();
    await loginEmailInput.typeText(user.email);
    await waitFor(loginPasswordInput.atIndex(0)).toBeVisible();
    await loginPasswordInput.atIndex(0).tap();
    await loginPasswordInput.atIndex(0).typeText('NewPassword123\n');
    await waitFor(elementByText('Search for your lover')).toBeVisible();
  });
});
