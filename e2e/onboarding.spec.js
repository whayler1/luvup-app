import { reloadApp } from 'detox-expo-helpers';
import times from 'lodash/times';

import {
  login,
  elementById,
  waitForElementById,
  generateUser,
} from './helpers';

const TIMEOUT = 3000;
describe('lover request', () => {
  let sender;
  let recipient;

  beforeAll(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
    const users = await Promise.all(times(2, generateUser));
    sender = users[0];
    recipient = users[1];
  });

  it('can send and accept lover request', async () => {
    await login(sender.email, sender.password);
    await waitFor(elementById('dashboard-create-lover-request-button'))
      .toBeVisible()
      .withTimeout(3000);
    // await elementById('dashboard-create-lover-request-button').tap();
    const loverRequestButton = await elementById(
      'dashboard-create-lover-request-button'
    );
    await waitFor(loverRequestButton)
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await loverRequestButton.tap();
    const createLoverRequestInput = elementById('create-lover-request-input');
    await waitFor(createLoverRequestInput)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestInput.tap();
    await createLoverRequestInput.typeText(recipient.username);
    const createLoverRequestListItem = elementById(
      `create-lover-request-list-item-${recipient.username}`
    );
    await waitFor(createLoverRequestListItem)
      .toBeVisible()
      .withTimeout(6000);
    await createLoverRequestListItem.tap();
    await createLoverRequestListItem.tap();
    const createLoverRequestButton = elementById('create-lover-request-button');
    await waitFor(createLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await createLoverRequestButton.tap();
    await waitFor(elementById('limit-exceeded-modal-title'))
      .toHaveText('Relationship Request Sent')
      .withTimeout(3000);
    await waitForElementById('dismiss-modal-button');
    await elementById('dismiss-modal-button').tap();
    await waitForElementById('hero-directions');
    await expect(elementById('dashboard-top-nav-coin-count')).toBeVisible();
    await expect(elementById('dashboard-top-nav-history-button')).toBeVisible();
    await expect(
      elementById('dashboard-top-nav-relationship-score')
    ).toBeVisible();
    await expect(elementById('dashboard-top-nav-menu-button')).toBeVisible();
    await expect(elementById('dashboard-write-love-note-button')).toBeVisible();
    await expect(elementById('dashboard-create-a-quiz-button')).toBeVisible();
    await elementById('hero-heart-view').swipe('up', 'fast', 0.5);
    await waitFor(elementById('hero-directions'))
      .toBeNotVisible()
      .withTimeout(3000);
    await elementById('dashboard-top-nav-menu-button').tap();
    await waitForElementById('menu-relationship-title');
    await elementById('menu-relationship-title').swipe('up', 'fast', 0.5);
    await elementById('menu-logout').tap();

    await login(recipient.email, recipient.password);
    const acceptLoverRequestButton = elementById('accept-lover-request-button');
    await waitFor(acceptLoverRequestButton)
      .toBeVisible()
      .withTimeout(3000);
    await acceptLoverRequestButton.tap();
    await waitFor(elementById('limit-exceeded-modal-title'))
      .toHaveText('Relationship Request Accepted')
      .withTimeout(3000);
    await waitForElementById('dismiss-modal-button');
    await elementById('dismiss-modal-button').tap();
    await waitForElementById('hero-directions');
    await waitFor(elementById('hero-heart-view'))
      .toBeVisible()
      .withTimeout(6000);
    await expect(elementById('dashboard-top-nav-coin-count')).toBeVisible();
    await expect(elementById('dashboard-top-nav-history-button')).toBeVisible();
    await expect(
      elementById('dashboard-top-nav-relationship-score')
    ).toBeVisible();
    await expect(elementById('dashboard-top-nav-menu-button')).toBeVisible();
    await expect(elementById('dashboard-write-love-note-button')).toBeVisible();
    await expect(elementById('dashboard-create-a-quiz-button')).toBeVisible();
    await elementById('hero-heart-view').swipe('up', 'fast', 0.5);
    await waitFor(elementById('hero-directions'))
      .toBeNotVisible()
      .withTimeout(3000);
    await elementById('dashboard-top-nav-history-button').tap();
    await waitFor(elementById('timeline-item-1'))
      .toBeNotVisible()
      .withTimeout(3000);
    /**
     * Test original user doesn't have placeholder user events
     */
    // await elementById('timeline-dashboard-button').tap();
    // await elementById('dashboard-top-nav-menu-button').tap();
    // await waitForElementById('menu-relationship-title');
    // await elementById('menu-relationship-title').swipe('up', 'fast', 0.5);
    // await elementById('menu-logout').tap();
    // await login(sender.email, sender.password);
    // await elementById('dashboard-top-nav-history-button').tap();
  });
});
