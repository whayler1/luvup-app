import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default ({
  coinCount,
  jalapenoCount,
  userFirstName,
  userLastName,
  loverFirstName,
  loverLastName,
  onScoreClick,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingTop: 40,
      top: 0,
    }}
  >
    <TouchableOpacity
      onPress={onScoreClick}
      style={{
        paddingLeft: 10,
        flex: 0.33,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../images/coin.png')}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: 'latoblack',
          fontSize: 16,
        }}
      >{coinCount}</Text>
      <Image
        source={require('../../images/jalapeno.png')}
        style={{
          width: 20,
          height: 30,
          marginLeft: 10,
        }}
      />
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: 'latoblack',
          fontSize: 16,
        }}
      >{jalapenoCount}</Text>
    </TouchableOpacity>
    <View
      style={{
        flex: 0.33,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'yesteryear',
          fontSize: 30,
        }}
      >luvup</Text>
    </View>
    <TouchableOpacity
      style={{
        paddingRight: 10,
        flex: 0.33,
        alignItems: 'flex-end',
      }}
    >
      <Text
        style={{
          fontFamily: 'latoblack',
          fontSize: 16,
        }}
      >{userFirstName.substr(0,1)}{userLastName.substr(0,1)} + {loverFirstName.substr(0,1)}{loverLastName.substr(0,1)}</Text>
    </TouchableOpacity>
  </View>
);
