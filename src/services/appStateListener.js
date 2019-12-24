import { AppState } from 'react-native';
import { getMe } from '../redux/user/user.actions';

let appState = AppState.currentState;
const onActiveListeners = {};

let handleAppStateChange;
const getHandleAppStateChange = (dispatch) => (nextAppState) => {
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    dispatch(getMe());
    Object.values(onActiveListeners).forEach((func) => {
      func();
    });
  }
  appState = nextAppState;
};

const start = (dispatch) => {
  handleAppStateChange = getHandleAppStateChange(dispatch);
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
