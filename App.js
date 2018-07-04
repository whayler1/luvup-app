import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Stack,
  Lightbox,
  Tabs,
  Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
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
import CreateLoveNote from './src/containers/CreateLoveNote';
import LoveNotes from './src/containers/LoveNotes';

import LoveNoteArt from './src/components/LoveNoteArt';

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

const getDefaultNavBar = (title) => ({
  ...sceneDefaults,
  renderTitle: (
    <Text style={{
      fontFamily: vars.fontBlack,
      color: vars.blueGrey500,
      fontSize: 25,
    }}>
      {title}
    </Text>
  ),
});

const WriteLoveNoteIcon = () => (
  <View>
    <Text>ABC 123 MEOW</Text>
  </View>
);

const App = () => (
  <Provider store={store}>
    <Router
      createReducer={reducerCreate}
      getSceneStyle={getSceneStyle}
    >
      <Lightbox>
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
            renderLeftButton={() => <View />}
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
            {...sceneDefaults}
            rednerLeftButton={() => <View />}
            renderBackButton={() => <View />}
            renderRightButton={() => {
              const state = store.getState();
              const { firstName, lastName } = state.user;
              const initials = firstName.substr(0,1).toUpperCase() + lastName.substr(0,1).toUpperCase();
              return (
                <View>
                  <TouchableOpacity onPress={() => Actions.menu()}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 16,
                        color: vars.blueGrey500,
                        marginRight: 16,
                      }}
                    >
                      { initials }
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <Scene
            key="createLoveNote"
            title="Write Love Note"
            component={CreateLoveNote}
            backTitle=" "
            {...getDefaultNavBar('Write Love Note')}
          />
          <Scene
            key="loveNotes"
            title="Love Notes"
            component={LoveNotes}
            backTitle=" "
            {...getDefaultNavBar('Read Love Notes')}
          />
        </Stack>
        <Scene
          key="notificationLightbox"
          component={InAppNotifications}
        />
      </Lightbox>
    </Router>
  </Provider>
);

export default App;
