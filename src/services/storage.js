import { AsyncStorage } from 'react-native';

const ID_TOKEN = 'id_token';
const GET_ME_DATA = 'getMeData';

const ALL_KEYS = [ID_TOKEN, GET_ME_DATA];

export const getAllData = async () => {
  const [id_token, getMeData] = await Promise.all([
    AsyncStorage.getItem(ID_TOKEN),
    AsyncStorage.getItem(GET_ME_DATA),
  ]);
  return { id_token, getMeData };
};

export const setGetMeData = (getMeData) =>
  AsyncStorage.setItem(GET_ME_DATA, JSON.stringify(getMeData));

export const setIdToken = (idToken) => AsyncStorage.setItem(ID_TOKEN, idToken);

export const removeAllData = () => AsyncStorage.multiRemove(ALL_KEYS);

export default AsyncStorage;
