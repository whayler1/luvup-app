import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './InAppNotifications.styles';

export default ({
  translateY,
  opacity,
  close,
  jalapenoNotifications,
  luvupNotifications,
  otherNotifications,
}) => (
  <Animated.View
    style={[
      styles.wrapper,
      {
        opacity,
        transform: [
          {
            translateY,
          },
        ],
      },
    ]}>
    <View style={styles.textWrap}>
      {luvupNotifications.length > 0 && (
        <Text style={styles.text}>
          You received{' '}
          {luvupNotifications.length > 1 ? luvupNotifications.length : 'a'}{' '}
          Luvup{luvupNotifications.length > 1 && 's'}!
        </Text>
      )}
      {jalapenoNotifications.length > 0 && (
        <Text style={styles.text}>
          You received{' '}
          {jalapenoNotifications.length > 1
            ? jalapenoNotifications.length
            : 'a'}{' '}
          jalapeno{jalapenoNotifications.length > 1 && 's'}
        </Text>
      )}
      {otherNotifications.map((notification, i) => (
        <Text key={i} style={styles.text}>
          {notification.data.message || notification.data.type}
        </Text>
      ))}
    </View>
    <TouchableOpacity onPress={close} style={styles.closeBtn}>
      <Ionicons name="md-close" size={30} color="white" />
    </TouchableOpacity>
  </Animated.View>
);
