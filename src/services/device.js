import * as Device from 'expo-device';

export const isAndroid = () => Device.osName === 'Android';

export const isIOS = () =>
  Device.osName === 'iOS' || Device.osName === 'iPadOS';

export default Device;
