import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { buttons, forms, scene } from '../../styles';

export default ({
  goToDashboard,
}) => (
  <View style={scene.container}>
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingTop: 40,
      }}
    >
      <TouchableOpacity
        onPress={goToDashboard}
        style={{
          paddingRight: 10,
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Image
          source={require('../../images/heart.png')}
          style={{
            width: 32,
            height: 30,
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
    <View>
      <Text>Timeline</Text>
    </View>
  </View>
);
