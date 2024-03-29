import _ from 'lodash';

import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from './notifications.actions';

const defaultState = {
  notifications: [],
  jalapenoNotifications: [],
  luvupNotifications: [],
  otherNotifications: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const { notification } = action;
      const notifications = [...state.notifications, notification];
      const luvupNotifications = notifications.filter(
        notification => _.get(notification, 'data.type') === 'luvup-received'
      );
      const jalapenoNotifications = notifications.filter(
        notification => _.get(notification, 'data.type') === 'jalapeno-received'
      );
      const otherNotifications = _.xor(
        notifications,
        luvupNotifications,
        jalapenoNotifications
      );

      return {
        notifications,
        luvupNotifications,
        jalapenoNotifications,
        otherNotifications,
      };
    }
    case CLEAR_NOTIFICATIONS:
      return { ...defaultState };
    default:
      return state;
  }
}
