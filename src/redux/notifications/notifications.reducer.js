import _ from 'lodash';

import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from './notification.actions';

const defaultState = {
  notifications: [],
  jalapenoNotifications: [],
  luvupReceivedNotifications: [],
};

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case ADD_NOTIFICATION:
      const { notifiction } = action;
      const updatedNotifications = [...state.notifications, notification];
      const luvupReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'luvup-received');
      const jalapenoReceivedNotifications = updatedNotifications.filter(notification => _.get(notification, 'data.type') === 'jalapeno-received');

      return {
        notifications: updatedNotifications,
        luvupReceivedNotifications,
        jalapenoReceivedNotifications
      };
    case CLEAR_NOTIFICATIONS:
      return { ...defaultState };
    default:
      return state;
  }
}
