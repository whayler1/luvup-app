import React from 'react';
import { View } from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';
import LoadingAnimation from '../../components/LoadingAnimation';

export default ({ isPresent, isPreloaderVisible }) => {
  if (!isPresent) {
    return false;
  }
  return (
    <View style={styles.listFooterContainer}>
      {isPreloaderVisible && <LoadingAnimation fill={vars.blueGrey100} />}
    </View>
  );
};
