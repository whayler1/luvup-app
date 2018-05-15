import _ from 'lodash';

export const ADD_NOTIFICATION = 'notifications/add-notification';
export const CLEAR_NOTIFICATIONS = 'notifications/clear-notifications';

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification,
});

export const clearNotifications = () => ({ type: CLEAR_NOTIFICATIONS });
