import { Permissions, Notifications } from 'expo';
import superagent from 'superagent';
import { AsyncStorage, AlertIOS } from 'react-native';
import _ from 'lodash';

import config from '../config';

const registerForPushNotifications = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
  const expoPushToken = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem('expo_push_token', expoPushToken);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        setExpoPushToken(expoPushToken: "${expoPushToken}") {
          expoPushToken {
            id token
          }
        }
      }`,
    });
    return true;
  } catch (err) {
    AlertIOS.alert('err', err);
  }
  return false;
};

export default registerForPushNotifications;
