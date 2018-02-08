import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';

export default ({
  userInitials,
  loverInitials,
}) => (
  <View>
    <Text>list header component</Text>
    <Text>{userInitials}</Text>
    <Text>{loverInitials}</Text>
  </View>
);
