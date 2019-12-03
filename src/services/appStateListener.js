import { AppState } from 'react-native';
import { default as store } from '../redux';
import { getMe } from '../redux/user/user.actions';

let appState = AppState.currentState;
const onActiveListeners = {};

const handleAppStateChange = (nextAppState) => {
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    store.dispatch(getMe());
    Object.values(onActiveListeners).forEach((func) => {
      func();
    });
  }
  appState = nextAppState;
};

const start = () => {
  AppState.addEventListener('change', handleAppStateChange);
};

const stop = () => {
  AppState.removeEventListener('change', handleAppStateChange);
};

export const addOnActiveListener = (id, func) => {
  onActiveListeners[id] = func;
};

export const removeOnActiveListener = (id) => {
  delete onActiveListeners[id];
};

export default {
  start,
  stop,
};
