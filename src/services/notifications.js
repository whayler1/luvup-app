import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNotification } from '../redux/notifications/notifications.actions';
import { getMe } from '../redux/user/user.actions';
import { getRelationshipScore } from '../redux/relationshipScore/relationshipScore.actions';
import { store } from '../redux';

let eventSubscription;
const relationshipScoreUpdateTypes = [
  'luvup-received',
  'jalapeno-received',
  'love-note',
];

const relationshipRequestTypes = [
  'lover-request-received',
  'lover-request-accepted',
];

export const onNotificationReceived = notification => {
  store.dispatch(addNotification(notification));
  Actions.notificationLightbox();
  Vibration.vibrate();

  const { type } = notification.data;
  if (relationshipScoreUpdateTypes.includes(type)) {
    store.dispatch(getRelationshipScore());
  }
  if (relationshipRequestTypes.includes(type)) {
    console.log('\n\n --relationship type update!');
    store.dispatch(getMe());
  }
};

export const listen = () => {
  if (!eventSubscription) {
    eventSubscription = Notifications.addListener(onNotificationReceived);
  }
};

export const remove = () => {
  if (eventSubscription !== undefined) {
    eventSubscription.remove();
    eventSubscription = undefined;
  }
};
