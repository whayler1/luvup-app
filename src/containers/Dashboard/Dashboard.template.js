import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

import styles from './Dashboard.styles';
import { buttons, forms, scene } from '../../styles';

export default ({
  username,
  loverUsername,
  loverRequestUsername,
  loverRequestCreatedAt,
  logout,
}) => (
  <View style={scene.container}>
    {loverRequestUsername.length > 0 && <Text>You sent a loverRequest to {loverRequestUsername} {moment(new Date(loverRequestCreatedAt)).fromNow()}</Text>}
    <Text style={forms.title}>Logged in as {username}</Text>
    {loverUsername.length > 0 && <Text>{loverUsername} is your lover</Text>}
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
