import React from 'react';
import { View, Text } from 'react-native';

import styles from './Root.styles';
import { forms, scene } from '../../styles';

export default () => (
  <View style={scene.container}>
    <Text style={forms.title}>Luvup!</Text>
  </View>
);
