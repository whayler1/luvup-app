import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  children,
  isReady,
}) => (
  <View style={{
    padding: 0,
    flex: 1,
    flexDirection: 'column',
  }}>
    {isReady && (
      <View style={{
        borderRadius: 4,
        backgroundColor: vars.blue500,
        position: 'absolute',
        left: 8,
        right: 8,
        top: 46,
        zIndex: 100,
        padding: 16,
        shadowColor: vars.blueGrey700,
        shadowOffset: {
          width: 2,
          height:2,
        },
        shadowOpacity: 0.2,
        flexDirection: 'row',
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
          onPress={() => {}}
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
      </View>
    )}
    {...children}
  </View>
);
