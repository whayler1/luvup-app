import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import { store } from './src/redux';

import Root from './src/containers/Root';
import Login from './src/containers/Login';
import SignUp from './src/containers/SignUp';
import SignUpConfirm from './src/containers/SignUpConfirm';
import Dashboard from './src/containers/Dashboard';
import CreateLoverRequest from './src/containers/CreateLoverRequest';
import Timeline from './src/containers/Timeline';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const App = () => (
  <Provider store={store}>
    <Router
      createReducer={reducerCreate}
      getSceneStyle={getSceneStyle}
    >
      <Stack key="root">
        <Scene
          key="init"
          component={Root}
          title="Root"
          hideNavBar={true}
        />
        <Scene
          key="login"
          component={Login}
          title="Login"
        />
        <Scene
          key="signup"
          component={SignUp}
          title="Sign Up"
        />
        <Scene
          key="signupconfirm"
          component={SignUpConfirm}
          title="Confirm Sign Up"
        />
        <Scene
          key="dashboard"
          component={Dashboard}
          title="Dashboard"
          hideNavBar={true}
        />
        <Scene
          key="createloverrequest"
          component={CreateLoverRequest}
          hideNavBar={true}
        />
        <Scene
          key="timeline"
          component={Timeline}
          hideNavBar={true}
        />
      </Stack>
    </Router>
  </Provider>
);

export default App;
