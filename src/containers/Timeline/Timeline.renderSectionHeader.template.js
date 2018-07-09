import React from 'react';
import { View, Text } from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';

export default ({ section }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderText}>{section.title}</Text>
  </View>
);
