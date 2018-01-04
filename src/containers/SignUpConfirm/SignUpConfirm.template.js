import React from 'react';
import { View, Text } from 'react-native';

import styles from './SignUpConfirm.styles';
import defaultStyles from '../../styles';

const { forms } = defaultStyles;

export default () => (
  <View style={styles.container}>
    <Text style={forms.title}>Confirm Sign Up</Text>
  </View>
);
