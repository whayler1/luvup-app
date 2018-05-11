import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import _ from 'lodash';

const onNotificationReceived = notification => {
  const updatedNotifications = [...this.state.notifications, notification];
  const luvupReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'luvup-received');
  const jalapenoReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'jalapeno-received');

  this.setState({
    notifications: updatedNotifications,
    luvupReceivedNotifications,
    jalapenoReceivedNotifications
  });
  Vibration.vibrate();
};

Notifications.addListener(onNotificationReceived);
