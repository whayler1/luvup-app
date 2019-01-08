/* eslint-disable import/no-commonjs */
const { reloadApp } = require('detox-expo-helpers');
const uuidv1 = require('uuid/v1');
const Moniker = require('moniker');
// const { login } = require('./helpers');

// TODO: test sign up page properly handles new signup error shape
// res.errors[0].message

const createUser = async (username, userEmail, firstName, lastName) => {
  await waitFor(element(by.text('Login')))
    .toBeVisible()
    .withTimeout(3000);
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
  // // TODO: make username not uuid
  await element(by.id('create-profile-username-input')).typeText(
    `${username}\n`
  );
  await element(by.id('create-profile-firstname-input')).typeText(
    `${firstName}\n`
  );
  await element(by.id('create-profile-lastname-input')).typeText(
    `${lastName}\n`
  );
  await element(by.id('create-profile-password-input')).typeText(
    'testing123\n'
  );
  await element(by.id('create-profile-passwordagain-input')).typeText(
    'testing123\n'
  );
};

describe.only('onboarding', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  it('happy path', async () => {
    const uuid = uuidv1();
    const moniker = Moniker.choose();
    const [firstName, lastName] = moniker.split('-');
    const username = `${moniker}${uuid.substr(0, 5)}`;
    const userEmail = `justin+${username}@luvup.io`;
    await createUser(username, userEmail, firstName, lastName);

    const menuButton = element(by.id('create-lover-request-menu-button'));
    await waitFor(menuButton)
      .toBeVisible()
      .withTimeout(3000);
    await menuButton.tap();
    const menuLogout = element(by.id('menu-logout'));
    await waitFor(menuLogout)
      .toBeVisible()
      .withTimeout(3000);
    await menuLogout.tap();
    await waitFor(element(by.text('Login')))
      .toBeVisible()
      .withTimeout(3000);

    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });

    const moniker2 = Moniker.choose();
    const [firstName2, lastName2] = moniker2.split('-');
    const username2 = `${moniker2}${uuid.substr(0, 5)}`;
    const userEmail2 = `justin+${username2}@luvup.io`;
    await createUser(username2, userEmail2, firstName2, lastName2);
    const createLoverRequestInput = element(
      by.id('create-lover-request-input')
    );
    await waitFor(createLoverRequestInput)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestInput.tap();
    await createLoverRequestInput.typeText(username);
    const createLoverRequestListItem = element(
      by.id(`create-lover-request-list-item-${username}`)
    );
    await waitFor(createLoverRequestListItem)
      .toBeVisible()
      .withTimeout(6000);
    await createLoverRequestListItem.tap();
    await createLoverRequestListItem.tap();

    const createLoverRequestButton = element(
      by.id('create-lover-request-button')
    );
    await waitFor(createLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestButton.tap();

    await waitFor(element(by.id('hero-lover-request-copy')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('dashboard-menu-button')).tap();

    await waitFor(element(by.id('menu-logout')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('menu-logout')).tap();
  });
});
