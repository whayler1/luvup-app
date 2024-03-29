import { Notifications } from 'expo';
import { Vibration } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNotification } from '../redux/notifications/notifications.actions';
import { getRelationshipScore } from '../redux/relationshipScore/relationshipScore.actions';

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

export const onNotificationReceived = (dispatch, getMe) => (notification) => {
  dispatch(addNotification(notification));
  Actions.notificationLightbox();
  Vibration.vibrate();

  const { type } = notification.data;
  if (relationshipScoreUpdateTypes.includes(type)) {
    dispatch(getRelationshipScore());
  }
  if (relationshipRequestTypes.includes(type)) {
    dispatch(getMe());
  }
};

export const listen = (dispatch, getMe) => {
  if (!eventSubscription) {
    eventSubscription = Notifications.addListener(
      onNotificationReceived(dispatch, getMe),
    );
  }
};

export const remove = () => {
  if (eventSubscription !== undefined) {
    eventSubscription.remove();
    eventSubscription = undefined;
  }
};
