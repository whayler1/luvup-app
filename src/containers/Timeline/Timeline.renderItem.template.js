import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from './Timeline.styles';
import { vars } from '../../styles';

import heartImg from '../../images/heart.png';
import jalapenoImg from '../../images/jalapeno.png';
import jalapenoSentImg from '../../images/jalapeno-sent.png';
import jalapenoReceivedImg from '../../images/jalapeno-received.png';
import coinImg from '../../images/coin.png';
import coinSentImg from '../../images/coin-sent.png';
import coinReceivedImg from '../../images/coin-received.png';

const getEventDisplayName = (eventName, count) => {
  const plur = count > 1 ? 's' : '';

  switch (eventName) {
    case 'coin-sent':
      return `Luvup${plur} sent`;
    case 'coin-received':
      return `Luvup${plur} received`;
    case 'jalapeno-sent':
      return `Jalapeno${plur} sent`;
    case 'jalapeno-received':
      return `Jalapeno${plur} received`;
    default:
      return eventName;
  }
};
const getEventImage = eventName => {
  switch (eventName) {
    case 'coin-sent':
      return (
        <Image
          style={{
            width: 32,
            height: 25,
          }}
          source={coinSentImg}
        />
      );
    case 'coin-received':
      return (
        <Image
          style={{
            width: 31,
            height: 25,
          }}
          source={coinReceivedImg}
        />
      );
    case 'jalapeno-sent':
    return (
      <Image
        style={{
          width: 24,
          height: 25,
        }}
        source={jalapenoSentImg}
      />
    );
    case 'jalapeno-received':
      return (
        <Image
          style={{
            width: 26,
            height: 25,
          }}
          source={jalapenoReceivedImg}
        />
      );
    default:
      return '';
  }
};

export default ({ item }) => (
  <View style={styles.renderItemContainer}>
    <View style={styles.renderItemContent}>
      {getEventImage(item.name)}
      <Text style={styles.renderItemContentText}>
        {item.count} {getEventDisplayName(item.name, item.count)}
      </Text>
    </View>
    <View>
      <Text style={styles.renderItemContentSmall}>
        {item.time}
      </Text>
    </View>
  </View>
);