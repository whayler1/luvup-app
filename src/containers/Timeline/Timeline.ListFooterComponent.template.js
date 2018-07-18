import React from 'react';
import { View, Text, Image } from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';
import Preloader from '../../components/Preloader';

export default ({ isPreloaderVisible }) => (
  <View style={styles.listFooterContainer}>
    {isPreloaderVisible && <Preloader />}
  </View>
);
