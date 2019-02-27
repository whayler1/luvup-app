import React from 'react';
import { View } from 'react-native';

import styles from './Timeline.styles';
import Preloader from '../../components/Preloader';

export default ({ isPresent, isPreloaderVisible }) => {
  if (!isPresent) {
    return false;
  }
  return (
    <View style={styles.listFooterContainer}>
      {isPreloaderVisible && <Preloader />}
    </View>
  );
};
