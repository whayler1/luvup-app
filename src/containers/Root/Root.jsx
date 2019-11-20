import React, { useEffect, useState } from 'react';
import { AsyncStorage, View, Text, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-namespace */
import * as Font from 'expo-font';
import isString from 'lodash/isString';

import Well from '../../components/Well';
import Button, { BUTTON_STYLES } from '../../components/Button';
import styles from './Root.styles';
import { scene, vars } from '../../styles';
import {
  reauth as reauthAction,
  logout as logoutAction,
} from '../../redux/user/user.actions';
import { setIsFontLoaded as setIsFontLoadedAction } from '../../redux/font/font.actions';
import LoadingAnimation from '../../components/LoadingAnimation';

const Root = ({
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

  useEffect(() => {
    const callReauthWithIdToken = async id_token => {
      if (id_token) {
        reauth(id_token);
      } else {
        Actions.reset('login');
      }
    };
    const useAsyncStorageToSetIdToken = async () => {
      const id_token = await AsyncStorage.getItem('id_token');
      setIdToken(id_token);
      callReauthWithIdToken(id_token);
    };
    const loadFont = async () => {
      await Font.loadAsync({
        yesteryear: require('../../fonts/yesteryear/yesteryear.ttf'),
        quicksandregular: require('../../fonts/Quicksand/Quicksand-Regular.ttf'),
        quicksandbold: require('../../fonts/Quicksand/Quicksand-Bold.ttf'),
      });

      await setIsFontLoaded(true);
      useAsyncStorageToSetIdToken();
    };
    loadFont();
  }, []);

  const isErrorMessage =
    isString(reauthErrorMessage) && reauthErrorMessage.length > 0;

  return (
    <View style={scene.content}>
      <View style={scene.container}>
        <StatusBar barStyle="dark-content" />
        {isFontLoaded && (
          <>
            <Text style={styles.title}>luvup</Text>
            <View
              style={{
                height: 20,
                alignSelf: 'stretch',
              }}>
              {!isErrorMessage && <LoadingAnimation fill={vars.blueGrey100} />}
            </View>
            {isErrorMessage && (
              <>
                <Text style={[scene.bodyCopy, scene.textCenter]}>
                  There was an error connecting to Luvup. Please make sure you
                  are connected to wifi or data.
                </Text>
                <Well
                  styles={{ marginTop: vars.gutter }}
                  text={reauthErrorMessage}
                />
                <View style={{ marginTop: vars.gutterAndHalf }}>
                  <Button
                    buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                    title="Try Again"
                    onPress={handleReauthPress}
                  />
                </View>
                <View style={{ marginTop: vars.gutterAndHalf }}>
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
  reauth: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  reauthErrorMessage: PropTypes.string.isRequired,
  setIsFontLoaded: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    id: state.user.id,
    reauthErrorMessage: state.user.reauthErrorMessage,
    isFontLoaded: state.font.isFontLoaded,
  }),
  {
    reauth: reauthAction,
    logout: logoutAction,
    setIsFontLoaded: setIsFontLoadedAction,
  }
)(Root);
