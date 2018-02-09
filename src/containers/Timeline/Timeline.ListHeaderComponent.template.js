import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import ReactArt, {
    Group,
    Shape,
    Surface,
    Transform,
} from 'ReactNativeART';

import Circle from '../../components/Circle';
import { vars } from '../../styles';
import styles from './Timeline.styles';
import coinImg from '../../images/coin.png';
import jalapenoImg from '../../images/jalapeno.png';

const circumfrance = 36;
const radius = circumfrance / 2;

const leaderboardSlot = ({
  initials,
  coinCount,
  jalapenoCount,
}) => (
  <View style={styles.leaderboardSlot}>
    <View style={{
      width: circumfrance,
      height: circumfrance,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Surface
        width={42}
        height={42}
      >
        <Group>
          <Circle
            radius={21}
            fill={vars.blueGrey500}
          />
        </Group>
      </Surface>
      <Text
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: vars.fontBlack,
          fontSize: 20,
        }}
      >
        {initials}
      </Text>
    </View>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
        source={coinImg}
        style={{
          width: 36,
          height: circumfrance,
          marginLeft: 32,
        }}
      />
      <Text style={styles.leaderboardText}>{ coinCount }</Text>
      <Image
        source={jalapenoImg}
        style={{
          width: 25,
          height: circumfrance,
          marginLeft: 16,
        }}
      />
      <Text style={styles.leaderboardText}>{ jalapenoCount }</Text>
    </View>
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
