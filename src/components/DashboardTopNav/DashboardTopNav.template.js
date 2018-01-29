import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default ({
  coinCount,
}) => (
  <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 20,
  }}>
    <TouchableOpacity style={{
      paddingLeft: 20,
      backgroundColor: 'yellow',
      flex: 0.33,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Image
        source={require('../../images/coin.png')}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <Text style={{
        paddingLeft: 5,
        fontFamily: 'latoblack',
        fontSize: 16,
      }}>{coinCount}</Text>
    </TouchableOpacity>
    <View style={{
      flex: 0.33,
      alignItems: 'center',
    }}>
      <Text style={{
        fontFamily: 'yesteryear',
        fontSize: 30,
      }}>luvup</Text>
    </View>
    <TouchableOpacity style={{
      paddingRight: 20,
      flex: 0.33,
      alignItems: 'flex-end',
    }}>
      <Image
        source={require('../../images/coin.png')}
        style={{
          width: 30,
          height: 30
        }}
      />
    </TouchableOpacity>
  </View>
);
