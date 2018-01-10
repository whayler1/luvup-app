import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './Dashboard.styles';
import { buttons, forms } from '../../styles';

export default ({
  username,
  logout
}) => (
  <View>
    <Text style={forms.title}>Logged in as {username}</Text>
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
