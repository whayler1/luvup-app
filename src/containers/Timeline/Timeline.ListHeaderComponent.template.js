import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { vars } from '../../styles';
import styles from './Timeline.styles';

const leaderboardSlot = ({
  initials,
  coinCount,
  jalapenoCount,
}) => (
  <View style={styles.leaderboardSlot}>
    <Text>{ initials } { coinCount } { jalapenoCount }</Text>
  </View>
);

export default ({
  userInitials,
  loverInitials,
  coinCount,
  jalapenoCount,
  sentCoinsCount,
  sentJalapenosCount,
}) => (
  <View style={styles.listHeaderContainer}>
    {leaderboardSlot({
      initials: userInitials,
      coinCount: coinCount,
      jalapenoCount: jalapenoCount,
    })}
    {leaderboardSlot({
      initials: loverInitials,
      coinCount: sentCoinsCount,
      jalapenoCount: sentJalapenosCount,
    })}
  </View>
);
