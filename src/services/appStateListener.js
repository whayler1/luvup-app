import { AppState } from 'react-native';

let appState = AppState.currentState;
const onActiveListeners = {};

let handleAppStateChange;
const getHandleAppStateChange = (dispatch, getMe) => (nextAppState) => {
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    dispatch(getMe());
    Object.values(onActiveListeners).forEach((func) => {
      func();
    });
  }
  appState = nextAppState;
};

const start = (dispatch, getMe) => {
  handleAppStateChange = getHandleAppStateChange(dispatch, getMe);
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
