import React from 'react';
import { Provider } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Stack,
  Lightbox,
  Tabs,
  Actions,
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
import CreateInvite from './src/containers/CreateInvite';
import CreateLoverRequest from './src/containers/CreateLoverRequest';
import Timeline from './src/containers/Timeline';
import TimelineRelationshipScore from './src/containers/TimelineRelationshipScore';
import Menu from './src/containers/Menu';
import ConfirmLoverRequest from './src/containers/ConfirmLoverRequest';
import InAppNotifications from './src/containers/InAppNotifications';
import CreateLoveNote from './src/containers/CreateLoveNote';
import LoveNotes from './src/containers/LoveNotes';
import TimelineRelationshipScoreArt from './src/components/Art/TimelineRelationshipScoreArt';
import TimelineArt from './src/components/Art/TimelineArt';
import ViewLoveNote from './src/containers/ViewLoveNote';
import CreateQuizQuestion from './src/containers/CreateQuizQuestion';
import CreateQuizChoices from './src/containers/CreateQuizChoices';
import CreateQuizReward from './src/containers/CreateQuizReward';
import CreateQuizReview from './src/containers/CreateQuizReview';
import ViewQuiz from './src/containers/ViewQuiz';
import ForgotPassword from './src/containers/ForgotPassword';
import ResetPasswordWithGeneratedPassword from './src/containers/ResetPasswordWithGeneratedPassword';
import ResendLoverRequest from './src/containers/ResendLoverRequest';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => defaultReducer(state, action);
};

const getSceneStyle = () => ({
  backgroundColor: 'white',
});

const sceneDefaults = {
  ..._.pick(navbar, ['navigationBarStyle']),
  navBarButtonColor: vars.cyan500,
  renderTitle: <View />,
};

const getDefaultNavBar = title => ({
  ...sceneDefaults,
  renderTitle: (
    <Text
      style={{
        fontFamily: vars.fontRegular,
        color: vars.blueGrey500,
        fontSize: 25,
      }}>
      {title}
    </Text>
  ),
});

const App = () => (
  <Provider store={store}>
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
      <Lightbox>
        <Stack key="root">
          <Scene key="init" component={Root} title="Root" hideNavBar init />
          <Scene key="login" component={Login} title="Login" hideNavBar />
          <Scene
            key="forgotPassword"
            component={ForgotPassword}
            title="Forgot Password"
            {...getDefaultNavBar()}
          />
          <Scene
            key="resetPasswordWithGeneratedPassword"
            component={ResetPasswordWithGeneratedPassword}
            title="Reset Password"
            hideNavBar
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
            hideNavBar
          />
          <Scene
            key="dashboard"
            component={Dashboard}
            title="Dashboard"
            hideNavBar
          />
          <Scene
            key="createInvite"
            component={CreateInvite}
            title="Create Invite"
            hideNavBar
          />
          <Scene
            key="createloverrequest"
            component={CreateLoverRequest}
            hideNavBar
          />
          <Scene
            key="viewLoveNote"
            path="/loveNote/loveNoteId"
            component={ViewLoveNote}
            {...getDefaultNavBar('')}
          />
          <Tabs
            key="timelineTabs"
            showLabel={false}
            tabBarStyle={{ backgroundColor: 'white' }}>
            <Scene
              key="timeline"
              title="History"
              icon={({ focused, title }) => (
                <View
                  style={{
                    paddingBottom: 30,
                    width: 80,
                    height: 30,
                    alignItems: 'center',
                  }}>
                  <TimelineArt
                    fill={focused ? vars.razzleDazzleRose : vars.blueGrey500}
                    scale={0.4}
                  />
                </View>
              )}
              component={Timeline}
              hideNavBar
            />
            <Scene
              key="timelineRelationshipScore"
              title="Relationship Scores"
              icon={({ focused, title }) => (
                <View
                  style={{
                    paddingBottom: 40,
                    width: 80,
                    height: 30,
                    alignItems: 'center',
                  }}>
                  <TimelineRelationshipScoreArt
                    fill={focused ? vars.razzleDazzleRose : vars.blueGrey500}
                    scale={0.4}
                  />
                </View>
              )}
              component={TimelineRelationshipScore}
              hideNavBar
            />
          </Tabs>
          <Scene key="menu" component={Menu} hideNavBar />
          <Scene
            key="resendLoverRequest"
            component={ResendLoverRequest}
            {...sceneDefaults}
          />
          <Scene
            key="confirmLoverRequest"
            component={ConfirmLoverRequest}
            {...sceneDefaults}
            renderLeftButton={() => <View />}
            renderBackButton={() => <View />}
            renderRightButton={() => {
              const state = store.getState();
              const { firstName, lastName } = state.user;
              const initials =
                firstName.substr(0, 1).toUpperCase() +
                lastName.substr(0, 1).toUpperCase();
              return (
                <View>
                  <TouchableOpacity onPress={() => Actions.menu()}>
                    <Text
                      style={{
                        fontFamily: vars.fontBlack,
                        fontSize: 16,
                        color: vars.blueGrey500,
                        marginRight: 16,
                      }}>
                      {initials}
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
          <Scene
            key="createQuizQuestion"
            hideNavBar
            component={CreateQuizQuestion}
          />
          <Scene
            key="createQuizChoices"
            hideNavBar
            component={CreateQuizChoices}
          />
          <Scene
            key="createQuizReward"
            hideNavBar
            component={CreateQuizReward}
          />
          <Scene
            key="createQuizReview"
            hideNavBar
            component={CreateQuizReview}
          />
          <Scene
            key="ViewQuiz"
            component={ViewQuiz}
            {...getDefaultNavBar('')}
            navigationBarStyle={{
              backgroundColor: vars.razzleDazzleRose,
              borderBottomWidth: 0,
            }}
            navBarButtonColor="rgba(0,0,0,0.5)"
          />
        </Stack>
        <Scene key="notificationLightbox" component={InAppNotifications} />
      </Lightbox>
    </Router>
  </Provider>
);

export default App;
