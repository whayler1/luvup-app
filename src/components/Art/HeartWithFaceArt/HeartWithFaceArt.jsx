import React from 'react';
import { View } from 'react-native';

import HeartArt from '../HeartArt';
import HeroEye from '../../HeroEye';
import { vars } from '../../../styles';

const HeartWithFaceArt = ({ scale }) => (
  <View
    style={{
      position: 'relative',
    }}
  >
    <HeartArt fill={vars.razzleDazzleRose} scale={scale} />
    <View
      style={{
        position: 'absolute',
        left: -17,
        top: 9,
        transform: [{ scale: 0.35 }],
      }}
    >
      <HeroEye />
    </View>
    <View
      style={{
        position: 'absolute',
        left: -17,
        top: 9,
        transform: [{ scale: 0.35 }],
      }}
    >
      <HeroEye />
    </View>
    <View
      style={{
        position: 'absolute',
        left: 23,
        top: 9,
        transform: [{ scaleX: -0.35 }, { scaleY: 0.35 }],
      }}
    >
      <HeroEye />
    </View>
  </View>
);

export default HeartWithFaceArt;
