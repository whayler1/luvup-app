import isObject from 'lodash/isObject';
import { AsyncStorage } from 'react-native';

const ID_TOKEN = 'id_token';
const GET_ME_DATA = 'getMeData';

const ALL_KEYS = [ID_TOKEN, GET_ME_DATA];

const getGetMeData = async () => {
  const getMeDataString = await AsyncStorage.getItem(GET_ME_DATA);
  const getMeData = getMeDataString
    ? JSON.parse(getMeDataString)
    : getMeDataString;
  return getMeData;
};

export const getAllData = async () => {
  const [id_token, getMeData] = await Promise.all([
    AsyncStorage.getItem(ID_TOKEN),
    getGetMeData(),
  ]);
  return { id_token, getMeData };
};

export const setGetMeData = (getMeData) =>
  AsyncStorage.setItem(GET_ME_DATA, JSON.stringify(getMeData));

export const updateSentCoins = async (sentCoins) => {
  const oldGetMeData = await getGetMeData();
  if (!isObject(oldGetMeData)) {
    return;
  }
  const getMeData = {
    ...oldGetMeData,
    sentCoins: {
      ...oldGetMeData.sentCoins,
      rows: sentCoins,
    },
  };
  return setGetMeData(getMeData);
};

export const setIdToken = (idToken) => AsyncStorage.setItem(ID_TOKEN, idToken);

export const removeAllData = () => AsyncStorage.multiRemove(ALL_KEYS);

export default AsyncStorage;
