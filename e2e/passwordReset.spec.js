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
    // await waitFor(forgotPasswordEl)
    //   .toBeVisible()
    //   .withTimeout(LONG_TIMEOUT);
    await forgotPasswordEl.tap();
    // await waitFor(forgotPasswordEmailEl)
    //   .toBeVisible()
    //   .withTimeout(LONG_TIMEOUT);
    await forgotPasswordEmailEl.tap();
    await forgotPasswordEmailEl.typeText(user.email);
    await forgotPasswordSubmit.tap();
    await forgotPasswordLoginButton.tap();
  });
});
