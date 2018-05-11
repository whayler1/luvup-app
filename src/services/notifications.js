import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import _ from 'lodash';

let eventSubscription;

const onNotificationReceived = notification => {
  // const updatedNotifications = [...this.state.notifications, notification];
  // const luvupReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'luvup-received');
  // const jalapenoReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'jalapeno-received');
  //
  // this.setState({
  //   notifications: updatedNotifications,
  //   luvupReceivedNotifications,
  //   jalapenoReceivedNotifications
  // });
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
