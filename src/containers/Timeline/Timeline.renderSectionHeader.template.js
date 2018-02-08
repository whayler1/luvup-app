import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';

export default ({ section }) => (
  <View style={{
    padding: 16,
    borderBottomColor: vars.blueGrey100,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  }}>
    <Text style={{
      color: vars.blueGrey500,
      fontSize: 20,
      fontFamily: vars.fontRegular,
    }}>{section.title}</Text>
  </View>
);
