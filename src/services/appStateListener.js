import { AppState } from 'react-native';
import store from '../redux';
import { getMe } from '../redux/user/user.actions';

let appState = AppState.currentState;

const handleAppStateChange = (nextAppState) => {
  console.log('app state change', nextAppState);
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
    store.dispatch(getMe());
  }
  appState = nextAppState;
};

const start = () => {
  console.log('start');
  AppState.addEventListener('change', handleAppStateChange);
};

const stop = () => {
  console.log('stop');
  AppState.removeEventListener('change', handleAppStateChange);
};

export default {
  start,
  stop,
}
