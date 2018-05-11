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
    <Text style={{
      fontFamily: vars.fontBlack,
      fontSize: 16,
      color: 'white',
      flex: 1,
      alignSelf: 'stretch',
      paddingRight: 16,
    }}>
      Something something 123 Something gg something 123 Something something 123 Something something 123
    </Text>
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
