import userLoginRouteSwitchFunc from './userLoginRouteSwitch';
import registerForPushNotificationsFunc from './registerForPushNotifications';

export { default as graphQlRequest } from './graphQlRequest';

export const emailRegex = /\S+@\S+\.\S+/;
export const passwordRegex = /^\S{8,}$/;

export const userLoginRouteSwitch = userLoginRouteSwitchFunc;
export const registerForPushNotifications = registerForPushNotificationsFunc;
