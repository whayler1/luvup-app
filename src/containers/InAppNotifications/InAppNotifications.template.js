import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  children
}) => (
  <View style={{ flex: 1 }}>
    <View style={{
      borderRadius: 4,
      backgroundColor: vars.blue500,
      position: 'absolute',
      left: 16,
      right: 16,
      top: 46,
      zIndex: 10,
      padding: 16,
      shadowColor: vars.blueGrey700,
      shadowOffset: {
        width: 2,
        height:2,
      },
      shadowOpacity: 0.2,
    }}>
      <Text>Something something 123</Text>
    </View>
    {...children}
  </View>
);
