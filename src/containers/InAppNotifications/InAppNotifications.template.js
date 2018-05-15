import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  translateY,
  opacity,
  close,
  jalapenoNotifications,
  luvupNotifications,
}) => (
  <Animated.View style={{
    borderRadius: 4,
    backgroundColor: vars.blue500,
    position: 'absolute',
    left: 8,
    right: 8,
    top: 96,
    zIndex: 500,
    padding: 16,
    shadowColor: vars.blueGrey700,
    shadowOffset: {
      width: 2,
      height:2,
    },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    opacity,
    transform: [{
      translateY
    }],
  }}>
    {luvupNotifications.length > 0 && (
      <Text style={{
        fontFamily: vars.fontBlack,
        fontSize: 16,
        color: 'white',
        flex: 1,
        alignSelf: 'stretch',
        paddingRight: 16,
      }}>
        You received {luvupNotifications.length > 1 ? luvupNotifications.length : 'a'} Luvup{luvupNotifications.length > 1 && 's'}!
      </Text>
    )}
    {jalapenoNotifications.length > 0 && (
      <Text style={{
        fontFamily: vars.fontBlack,
        fontSize: 16,
        color: 'white',
        flex: 1,
        alignSelf: 'stretch',
        paddingRight: 16,
      }}>
        You received {jalapenoNotifications.length > 1 ? jalapenoNotifications.length : 'a'} Jalapeno{jalapenoNotifications.length > 1 && 's'}
      </Text>
    )}
    <TouchableOpacity
      onPress={close}
      style={{
        flex: 0,
      }}
    >
      <Icon
        name="md-close"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  </Animated.View>
);
