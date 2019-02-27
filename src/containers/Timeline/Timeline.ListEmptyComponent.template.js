import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import { scene } from '../../styles';
import Well from '../../components/Well';
import styles from './Timeline.styles';

const ListEmptyComponent = ({ isInFlight, error }) => (
  <View style={styles.listItemEmptyWrapper}>
    {_.isString(error) && error.length > 0 && (
      <Well
        text={`There was an error loading the timeline. Make sure you are connected to data.\n\n${error}`}
      />
    )}
    {!error && !isInFlight && (
      <Text style={[scene.copy, styles.listItemEmptyText]}>
        You do not have any history yet. Send a Luvup to get things started!
      </Text>
    )}
  </View>
);

export default ListEmptyComponent;
