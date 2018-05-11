import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, Text, View } from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Stack,
} from 'react-native-router-flux';
import _ from 'lodash';

import { store } from './src/redux';
import { navbar, vars } from './src/styles';

import Root from './src/containers/Root';
import Login from './src/containers/Login';
import SignUp from './src/containers/SignUp';
import ConfirmUserRequestCode from './src/containers/ConfirmUserRequestCode';
import ConfirmUserRequestCreateProfile from './src/containers/ConfirmUserRequestCreateProfile';
import Dashboard from './src/containers/Dashboard';
import CreateLoverRequest from './src/containers/CreateLoverRequest';
import Timeline from './src/containers/Timeline';
import Menu from './src/containers/Menu';
import ConfirmLoverRequest from './src/containers/ConfirmLoverRequest';
import InAppNotifications from './src/containers/InAppNotifications';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: 'white',
});

const sceneDefaults = {
  ..._.pick(navbar, [
    'navigationBarStyle',
  ]),
  navBarButtonColor: vars.cyan500,
  renderTitle: <View><Text style={{
    fontFamily: vars.fontVanity,
    color: vars.blueGrey700,
    fontSize: 30,
  }}>luvup</Text></View>
};

const App = () => (
  <Provider store={store}>
    <InAppNotifications>
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
            init={true}
          />
          <Scene
            key="login"
            component={Login}
            title="Login"
            renderLeftButton={() => <View></View>}
            {...sceneDefaults}
          />
          <Scene
            key="signup"
            component={SignUp}
            title="Sign Up"
            {...sceneDefaults}
          />
          <Scene
            key="confirmUserRequestCode"
            component={ConfirmUserRequestCode}
            title="Enter Code"
            {...sceneDefaults}
          />
          <Scene
            key="confirmUserRequestCreateProfile"
            component={ConfirmUserRequestCreateProfile}
            title="Create Profile"
            {...sceneDefaults}
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
          <Scene
            key="menu"
            component={Menu}
            hideNavBar={true}
          />
          <Scene
            key="confirmLoverRequest"
            component={ConfirmLoverRequest}
            hideNavBar={true}
          />
        </Stack>
      </Router>
    </InAppNotifications>
  </Provider>
);

export default App;
