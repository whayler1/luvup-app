import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import { addNotification } from '../redux/notifications/notifications.actions';
import _ from 'lodash';

let eventSubscription;

const onNotificationReceived = notification => {
  addNotification(notifiction);
  Vibration.vibrate();
};

export const listen = () => {
  if (!eventSubscription) {
    eventSubscription = Notifications.addListener(onNotificationReceived);
  }
};

export const remove = () => {
  if (eventSubscription !== undefined) {
    Notifications.remove(eventSubscription);
    eventSubscription = undefined;
  }
}
