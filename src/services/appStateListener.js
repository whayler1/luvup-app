import { AppState } from 'react-native';

let appState = AppState.currentState;

const handleAppStateChange = (nextAppState) => {
  console.log('app state change', nextAppState);
  if (appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
  }
  appState = nextAppState;
};

const start = () => {
  console.log('start');
  AppState.addEventListener('change', handleAppStateChange);
};

const stop = () => {
  AppState.removeEventListener('change', handleAppStateChange);
};

export default {
  start,
  stop,
}
