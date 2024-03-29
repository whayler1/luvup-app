import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-namespace */
import * as Font from 'expo-font';
import isString from 'lodash/isString';

import Button, { BUTTON_STYLES } from '../../components/Button';
import styles from './Root.styles';
import { scene, vars } from '../../styles';
import {
  setGetMeSuccess as setGetMeSuccessAction,
  getMe as getMeAction,
  reauth as reauthAction,
  logout as logoutAction,
} from '../../redux/user/user.actions';
import { setIsFontLoaded as setIsFontLoadedAction } from '../../redux/font/font.actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import { getAllData as getAllStorageData } from '../../services/storage';

const Root = ({
  setGetMeSuccess,
  getMe,
  reauth,
  reauthErrorMessage,
  logout,
  isFontLoaded,
  setIsFontLoaded,
}) => {
  const [idToken, setIdToken] = useState('');

  function handleReauthPress() {
    reauth(idToken);
  }
  function handleDismissPress() {
    logout();
  }

  const useAsyncStorageToSetIdToken = async () => {
    const { id_token, getMeData } = await getAllStorageData();
    if (!id_token || !getMeData) {
      Actions.login();
    }

    setIdToken(id_token);
    setGetMeSuccess(getMeData);
    getMe({ retryOnTimeout: true });
  };

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        yesteryear: require('../../fonts/yesteryear/yesteryear.ttf'),
        quicksandregular: require('../../fonts/Quicksand/Quicksand-Regular.ttf'),
        quicksandbold: require('../../fonts/Quicksand/Quicksand-Bold.ttf'),
      });

      await setIsFontLoaded(true);
    };
    loadFont();
  }, []);

  useEffect(
    () => {
      if (isFontLoaded) {
        useAsyncStorageToSetIdToken();
      }
    },
    [isFontLoaded],
  );

  const isErrorMessage =
    isString(reauthErrorMessage) && reauthErrorMessage.length > 0;

  return (
    <View style={scene.content}>
      <View style={scene.container}>
        <StatusBar barStyle="light-content" />
        {isFontLoaded && (
          <>
            <Text style={styles.title}>luvup</Text>
            <View
              style={{
                height: 20,
                alignSelf: 'stretch',
              }}
            >
              {!isErrorMessage && <LoadingAnimation fill={vars.blueGrey100} />}
            </View>
            {isErrorMessage && (
              <>
                <Text style={[scene.bodyCopy, scene.textCenter]}>
                  There was an error connecting to Luvup. Please make sure you
                  are connected to wifi or data.
                </Text>
                <View
                  style={{
                    marginTop: vars.gutterAndHalf,
                    alignSelf: 'stretch',
                  }}
                >
                  <Button
                    buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                    title="Try Again"
                    onPress={handleReauthPress}
                  />
                </View>
                <Text
                  style={[
                    scene.bodyCopy,
                    scene.textCenter,
                    { marginTop: vars.gutterDouble },
                  ]}
                >
                  …or dismiss to try to log in as a different user.
                </Text>
                <View
                  style={{
                    marginTop: vars.gutterAndHalf,
                    alignSelf: 'stretch',
                  }}
                >
                  <Button
                    buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
                    title="Dismiss"
                    onPress={handleDismissPress}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

Root.propTypes = {
  isFontLoaded: PropTypes.bool,
  setGetMeSuccess: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
  reauth: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  reauthErrorMessage: PropTypes.string.isRequired,
  setIsFontLoaded: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    id: state.user.id,
    reauthErrorMessage: state.user.reauthErrorMessage,
    isFontLoaded: state.font.isFontLoaded,
  }),
  {
    setGetMeSuccess: setGetMeSuccessAction,
    getMe: getMeAction,
    reauth: reauthAction,
    logout: logoutAction,
    setIsFontLoaded: setIsFontLoadedAction,
  },
)(Root);
