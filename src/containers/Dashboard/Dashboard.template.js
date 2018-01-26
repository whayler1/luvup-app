import React from 'react';
import { View, Text, TextInput, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

import styles from './Dashboard.styles';
import { buttons, forms, scene } from '../../styles';

export default ({
  username,
  loverUsername,
  loverRequestUsername,
  loverRequestCreatedAt,
  coinCount,
  logout,
  panResponder,
  translateY,
  scale,
}) => (
  <View
    style={scene.container}
  >
    {loverRequestUsername.length > 0 && <Text>You sent a loverRequest to {loverRequestUsername} {moment(new Date(loverRequestCreatedAt)).fromNow()}</Text>}
    <Text style={forms.title}>Logged in as {username}</Text>
    {loverUsername.length > 0 && <Text>{loverUsername} is your lover</Text>}
    {!_.isNull(coinCount) && <Text>coin count: {coinCount}</Text>}
    <View
      style={styles.heartView}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={require('../../images/heart.png')}
        style={{
          width: 300,
          height: 275,
          transform: [{
            translateY
          }, {
            scaleX: scale
          }, {
            scaleY: scale
          }]
        }}
      />
    </View>
    <Button
      raised
      onPress={logout}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      title={'Log Out'}
    />
  </View>
);
