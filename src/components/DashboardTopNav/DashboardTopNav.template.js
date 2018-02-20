import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Pushdown from '../../components/Pushdown';
import { vars } from '../../styles';

export default ({
  coinCount,
  jalapenoCount,
  userFirstName,
  userLastName,
  loverFirstName,
  loverLastName,
  onScoreClick,
  onInitialsClick,
  isPushdownVisible,
  closePushdown,
  unviewedCoinCount,
  unviewedJalapenoCount,
}) => (
  <View
    style={{
      position: 'absolute',
      alignItems: 'center',
      backgroundColor: 'white',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 16,
      marginTop: 28,
      zIndex: 10,
    }}
  >
    {isPushdownVisible && (
      <Pushdown
        closeFunc={closePushdown}
      >
        {unviewedCoinCount > 0 && <Text
          style={{
            color: 'white',
            fontFamily: vars.fontRegular,
            fontSize: 18,
          }}
        >
          You received {unviewedCoinCount} luvup{ unviewedCoinCount > 1 ? 's' : ''}!
        </Text>}
        {unviewedJalapenoCount > 0 && <Text
          style={{
            color: 'white',
            fontFamily: vars.fontRegular,
            fontSize: 18,
          }}
        >
          You received {unviewedJalapenoCount} jalapeno{ unviewedJalapenoCount > 1 ? 's' : '' }
        </Text>}
      </Pushdown>
    )}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
      }}
    >
      <TouchableOpacity
        onPress={onScoreClick}
        style={{
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
            color: vars.blueGrey500,
          }}
        >
          {coinCount}
        </Text>
        <Image
          source={require('../../images/jalapeno.png')}
          style={{
            width: 23,
            height: 30,
            marginLeft: 10,
          }}
        />
        <Text
          style={{
            paddingLeft: 5,
            fontFamily: 'latoblack',
            fontSize: 16,
            color: vars.blueGrey500,
          }}
        >
          {jalapenoCount}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.33,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: vars.fontVanity,
            color: vars.blueGrey700,
            fontSize: 30,
          }}
        >
          luvup
        </Text>
      </View>
      <TouchableOpacity
        onPress={onInitialsClick}
        style={{
          flex: 0.33,
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: 'latoblack',
            fontSize: 16,
            color: vars.blueGrey500,
          }}
        >
          {userFirstName.substr(0,1)}{userLastName.substr(0,1)} + {loverFirstName.substr(0,1)}{loverLastName.substr(0,1)}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
