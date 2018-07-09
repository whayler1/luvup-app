import { AppState } from 'react-native';
import store from '../redux';
import { getMe } from '../redux/user/user.actions';

let appState = AppState.currentState;

const handleAppStateChange = nextAppState => {
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    store.dispatch(getMe());
  }
  appState = nextAppState;
};

const start = () => {
  AppState.addEventListener('change', handleAppStateChange);
};

const stop = () => {
  AppState.removeEventListener('change', handleAppStateChange);
};

export default {
  start,
  stop,
};
