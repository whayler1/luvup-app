import React from 'react';
import { View } from 'react-native';

import HeartArt from '../HeartArt';
import HeroEye from '../../HeroEye';
import HeroMouth from '../../HeroMouth';
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
        top: 8,
        transform: [{ scaleX: 0.35 }, { scaleY: 0.35 }],
      }}
    >
      <HeroEye />
    </View>
    <View
      style={{
        position: 'absolute',
        left: 25,
        top: 8,
        transform: [{ scaleX: -0.35 }, { scaleY: 0.35 }],
      }}
    >
      <HeroEye />
    </View>
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 45,
        transform: [{ scale: 0.35 }],
      }}
    >
      <HeroMouth relationshipScoreQuartile={3} />
    </View>
  </View>
);

export default HeartWithFaceArt;
