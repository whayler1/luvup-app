import { Permissions, Notifications } from 'expo';
import superagent from 'superagent';

import config from '../config';

const registerForPushNotifications = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let expoPushToken = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    superagent.post(config.graphQlUrl, {
      query: `mutation {
        setExpoPushToken(expoPushToken: "${expoPushToken}") { success }
      }`;
    });
    return true;
  } catch (err) {
    console.log('error registering for push notifications', err);
  }
  return false;
};
