import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import styles from './Root.styles';
import { forms, scene } from '../../styles';

export default ({ isFontLoaded }) => (
  <View style={scene.container}>
    <StatusBar barStyle="light-content" />
    {isFontLoaded && <Text style={styles.title}>luvup</Text>}
  </View>
);
