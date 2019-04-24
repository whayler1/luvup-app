import { reloadApp } from 'detox-expo-helpers';
import {
  elementById,
  elementByText,
  generateRelationship,
  login,
} from './helpers';
import _ from 'lodash';

const TIMEOUT = 3000;

describe('loveNote', () => {
  let user;
  let lover;

  beforeEach(async () => {
    await reloadApp({
      permissions: { location: 'always', notifications: 'YES' },
    });
  });

  beforeAll(async () => {
    const relationship = await generateRelationship();
    user = relationship.user;
    lover = relationship.lover;
  });

  it('should be able send a love note', async () => {
    await login(user.email, user.password);

    await waitFor(elementById('dashboard-write-love-note-button'))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await elementById('dashboard-write-love-note-button').tap();
    await waitFor(elementById('create-love-note-input'))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await elementById('create-love-note-input').tap();
    await elementById('create-love-note-input').typeText('Baby you cute');
    await elementById('create-love-note-add-luvup').tap();
    await elementById('create-love-note-add-luvup').tap();
    await elementById('create-love-note-add-luvup').tap();
    await elementById('create-love-note-submit').tap();
    await waitFor(elementByText('Sent!'))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await elementById('create-love-note-success-close-button').tap();

    await waitFor(elementById('dashboard-top-nav-history-button'))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await elementById('dashboard-top-nav-history-button').tap();

    await waitFor(elementById('timeline-item-0'))
      .toBeVisible()
      .withTimeout(TIMEOUT);
    await elementById('timeline-item-0').tap();
    await waitFor(
      elementByText(`You sent ${_.upperFirst(lover.firstName)} a love note`)
    )
      .toBeVisible()
      .withTimeout(TIMEOUT);
  });
});
