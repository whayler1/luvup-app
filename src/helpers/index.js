import get from 'lodash/get';
import isString from 'lodash/isString';

import registerForPushNotificationsFunc from './registerForPushNotifications';

export { default as graphQlRequest } from './graphQlRequest';

export const emailRegex = /\S+@\S+\.\S+/;
export const passwordRegex = /^\S{8,}$/;

export const registerForPushNotifications = registerForPushNotificationsFunc;

export const isStringWithLength = (string) =>
  isString(string) && string.length > 0;

export const sanitizeEmail = (email) => email.toLowerCase().trim();

export const getGraphQLError = (res) => get(res, 'errors[0].message');
