/* eslint-disable import/no-commonjs */
import { reloadApp } from 'detox-expo-helpers';
import uuidv1 from 'uuid/v1';
import Moniker from 'moniker';
import _ from 'lodash';

import { generateUser, login } from './helpers';

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
    'Testing123\n'
  );
  await element(by.id('create-profile-passwordagain-input')).typeText(
    'Testing123\n'
  );
};

describe('onboarding', () => {
  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  describe('when user receives relationship request while app is open', () => {
    let user1;
    let user2;

    beforeAll(async () => {
      [user1, user2] = await Promise.all(_.times(2, generateUser));
    });

    it('should display request received', async () => {
      await login(user1.email, user1.password);
      await device.sendUserNotification({
        trigger: {
          type: 'push',
        },
        body: `${user2.fullName} has requested you as a lover!`,
        payload: {
          type: 'lover-request-received',
        },
      });
    });
  });

  xdescribe('when user sends relationship request to user who has requested them', () => {
    it('should automatically accept request', () => {});
  });

  xdescribe('when user request already exists and app opens', () => {});

  xdescribe('happy path', () => {
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
      await element(by.id('dashboard-top-nav-menu-button')).tap();

      await waitFor(menuLogout)
        .toBeVisible()
        .withTimeout(3000);
      await menuLogout.tap();
      await waitFor(element(by.text('Login')))
        .toBeVisible()
        .withTimeout(3000);

      // await reloadApp({
      //   permissions: { location: 'always', notifications: 'YES' },
      // });
      // JW: this is the line that throws an error
      // await login(userEmail, 'Testing123');
      //
      // const acceptLoverRequestButton = element(
      //   by.id('confirm-user-accept-button')
      // );
      // await waitFor(acceptLoverRequestButton)
      //   .toBeVisible()
      //   .withTimeout(3000);
      // await acceptLoverRequestButton.tap();
      //
      // await waitFor(element(by.id('hero-heart-view')))
      //   .toBeVisible()
      //   .withTimeout(6000);
      // await expect(element(by.id('dashboard-top-nav-coin-count'))).toBeVisible();
      // await expect(
      //   element(by.id('dashboard-top-nav-history-button'))
      // ).toBeVisible();
      // await expect(
      //   element(by.id('dashboard-top-nav-relationship-score'))
      // ).toBeVisible();
      // await expect(element(by.id('dashboard-top-nav-menu-button'))).toBeVisible();
      // await expect(
      //   element(by.id('dashboard-write-love-note-button'))
      // ).toBeVisible();
      // await expect(
      //   element(by.id('dashboard-create-a-quiz-button'))
      // ).toBeVisible();
    });
  });
});
