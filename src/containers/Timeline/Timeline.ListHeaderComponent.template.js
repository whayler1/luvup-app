import React from 'react';
import { View, Text } from 'react-native';
import { Group, Surface } from 'ReactNativeART';
import Color from 'color';

import Circle from '../../components/Circle';
import { vars } from '../../styles';
import styles from './Timeline.styles';
import CoinArt from '../../components/CoinArt';
import JalapenoArt from '../../components/JalapenoArt';

const coinStrokeColor = Color(vars.razzleDazzleRose).mix(Color('white'), 0.3);

const circumfrance = 36;

const leaderboardSlot = ({
  relationshipScore,
  initials,
  coinCount,
  jalapenoCount,
  isSecond,
}) => (
  <View
    style={isSecond ? styles.leaderboardSlotSecond : styles.leaderboardSlot}>
    <View
      style={{
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Surface width={44} height={44}>
        <Group x={1} y={1}>
          <Circle radius={21} stroke="rgba(255,255,255,0.7)" strokeColor={2} />
        </Group>
      </Surface>
      <Text
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: vars.fontBlack,
          fontSize: 20,
        }}>
        {initials}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      }}>
      <View
        style={{
          marginRight: 4,
          width: 50,
          // backgroundColor: 'rgba(100,200,50,0.5)',
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: vars.fontBlack,
            fontSize: 20,
          }}>
          {`${relationshipScore}%`}
        </Text>
      </View>
      <CoinArt
        fill="rgba(255,255,255,0.6)"
        stroke={coinStrokeColor}
        scale={0.3}
      />
      <Text style={styles.leaderboardText}>{coinCount}</Text>
      <View style={{ marginLeft: 16 }}>
        <JalapenoArt fill="rgba(255,255,255,0.6)" scale={0.25} />
      </View>
      <Text style={styles.leaderboardText}>{jalapenoCount}</Text>
    </View>
  </View>
);

export default ({
  userRelationshipScore,
  loverRelationshipScore,
  userInitials,
  loverInitials,
  coinCount,
  jalapenoCount,
  sentCoinsCount,
  sentJalapenosCount,
}) => (
  <View style={styles.listHeaderContainer}>
    {leaderboardSlot({
      relationshipScore: userRelationshipScore,
      initials: userInitials,
      coinCount,
      jalapenoCount,
    })}
    {leaderboardSlot({
      relationshipScore: loverRelationshipScore,
      initials: loverInitials,
      coinCount: sentCoinsCount,
      jalapenoCount: sentJalapenosCount,
      isSecond: true,
    })}
  </View>
);
