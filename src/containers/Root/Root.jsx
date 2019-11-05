import React, { useEffect } from 'react';
import { AsyncStorage, View, Text, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-namespace */
import * as Font from 'expo-font';

import styles from './Root.styles';
import { scene, vars } from '../../styles';
import { reauth as reauthAction } from '../../redux/user/user.actions';
import { setIsFontLoaded as setIsFontLoadedAction } from '../../redux/font/font.actions';
import LoadingAnimation from '../../components/LoadingAnimation';

const Root = ({ reauth, isFontLoaded, setIsFontLoaded }) => {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        yesteryear: require('../../fonts/yesteryear/yesteryear.ttf'),
        quicksandregular: require('../../fonts/Quicksand/Quicksand-Regular.ttf'),
        quicksandbold: require('../../fonts/Quicksand/Quicksand-Bold.ttf'),
      });

      setIsFontLoaded(true);
    };
    const callReauthWithIdToken = async () => {
      const id_token = await AsyncStorage.getItem('id_token');

      if (id_token) {
        reauth(id_token);
      } else {
        Actions.reset('login');
      }
    };
    loadFont();
    callReauthWithIdToken();
  }, []);

  return (
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
            <LoadingAnimation fill={vars.blueGrey100} />
          </View>
        </>
      )}
    </View>
  );
};

Root.propTypes = {
  isFontLoaded: PropTypes.bool,
  reauth: PropTypes.func.isRequired,
  setIsFontLoaded: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    id: state.user.id,
    isFontLoaded: state.font.isFontLoaded,
  }),
  {
    reauth: reauthAction,
    setIsFontLoaded: setIsFontLoadedAction,
  }
)(Root);
