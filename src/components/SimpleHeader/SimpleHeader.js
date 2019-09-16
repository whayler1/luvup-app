import isString from 'lodash/isString';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { scene, vars } from '../../styles';
import styles from './SimpleHeader.styles';
import HeartArt from '../Art/HeartArt';

const getInitial = string =>
  isString(string) ? string.substr(0, 1).toUpperCase() : '';

const handleDashboardPress = () => {
  Actions.popTo('dashboard');
};

const handleMenuNavPress = () => {
  Actions.menu();
};

function SimpleHeader({ userFirstName, userLastName }) {
  return (
    <View style={scene.topNav}>
      <View style={scene.topNavContent}>
        <TouchableOpacity onPress={handleDashboardPress}>
          <HeartArt scale={0.037} fill={vars.blueGrey500} />
        </TouchableOpacity>
        <TouchableOpacity
          testID="create-lover-request-menu-button"
          onPress={handleMenuNavPress}
          style={styles.menuButton}>
          <Text style={styles.menuButtonText}>
            {getInitial(userFirstName)}
            {getInitial(userLastName)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SimpleHeader.propTypes = {
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
};

export default SimpleHeader;
