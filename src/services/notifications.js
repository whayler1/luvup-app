import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNotification } from '../redux/notifications/notifications.actions';
import { getRelationshipScore } from '../redux/relationshipScore/relationshipScore.actions';
import _ from 'lodash';
import store from '../redux';

let eventSubscription;

export const onNotificationReceived = notification => {
  store.dispatch(addNotification(notification));
  store.dispatch(getRelationshipScore());
  Actions.notificationLightbox();
  Vibration.vibrate();
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
