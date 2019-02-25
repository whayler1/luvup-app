import { reloadApp } from 'detox-expo-helpers';
import { generateUser } from './helpers';

// const LONG_TIMEOUT = 6000;

describe.only('password reset', () => {
  let user;

  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  beforeAll(async () => {
    user = await generateUser();
  });

  it('happy path', async () => {
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
    const createLoverRequestMenuButton = element(
      by.id('create-lover-request-menu-button')
    );
    const menuLogout = element(by.id('menu-logout'));
    const searchLoverText = element(by.text('Search for your lover'));

    await forgotPasswordEl.tap();
    await forgotPasswordEmailEl.tap();
    await forgotPasswordEmailEl.typeText(user.email);
    await forgotPasswordSubmit.tap();
    await forgotPasswordLoginButton.tap();

    await loginEmailInput.atIndex(0).tap();
    await loginEmailInput.atIndex(0).typeText(user.email);
    await loginPasswordInput.atIndex(0).tap();
    await loginPasswordInput.atIndex(0).typeText('abc123abc\n');
    await resetPasswordInput.tap();
    await resetPasswordInput.typeText('NewPassword123\nNewPassword123\n');
    await resetPasswordDoneButton.tap();

    await waitFor(searchLoverText).toBeVisible();
    await createLoverRequestMenuButton.tap();
    await menuLogout.tap();

    await loginEmailInput.atIndex(0).tap();
    await loginEmailInput.atIndex(0).typeText(user.email);
    await loginPasswordInput.atIndex(0).tap();
    await loginPasswordInput.atIndex(0).typeText('NewPassword123\n');
    await waitFor(searchLoverText.atIndex(0)).toBeVisible();
  });
});
