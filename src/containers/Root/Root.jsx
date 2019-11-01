import React, { useEffect } from 'react';
import { AsyncStorage, View, Text, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-namespace */
import * as Font from 'expo-font';

import styles from './Root.styles';
import { scene } from '../../styles';
import {
  userLoginRouteSwitch,
  registerForPushNotifications,
} from '../../helpers';
import { reauth as reauthAction } from '../../redux/user/user.actions';
import { setIsFontLoaded as setIsFontLoadedAction } from '../../redux/font/font.actions';

const Root = ({ id, reauth, isFontLoaded, setIsFontLoaded }) => {
  const handleReauth = async id_token => {
    await reauth(id_token);

    if (id) {
      registerForPushNotifications();
      userLoginRouteSwitch();
    } else {
      Actions.reset('login');
    }
  };
  useEffect(() => {
    const go = async () => {
      await Font.loadAsync({
        yesteryear: require('../../fonts/yesteryear/yesteryear.ttf'),
        quicksandregular: require('../../fonts/Quicksand/Quicksand-Regular.ttf'),
        quicksandbold: require('../../fonts/Quicksand/Quicksand-Bold.ttf'),
      });

      setIsFontLoaded(true);

      const id_token = await AsyncStorage.getItem('id_token');

      if (id_token) {
        handleReauth(id_token);
      } else {
        Actions.reset('login');
      }
    };
    go();
  }, []);

  return (
    <View style={scene.container}>
      <StatusBar barStyle="dark-content" />
      {isFontLoaded && <Text style={styles.title}>luvup</Text>}
    </View>
  );
};

Root.propTypes = {
  id: PropTypes.string,
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
