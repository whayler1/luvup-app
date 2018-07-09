import React from 'react';
import { Text, View } from 'react-native';
import ReactArt, { Group, Shape, Surface, Transform } from 'ReactNativeART';
import _ from 'lodash';

import Circle from '../Circle';
import { vars } from '../../styles';

const circumfrance = 80;
const radius = circumfrance / 2;
const innerOffset = 8;
const innerRadius = radius - innerOffset;

export default ({ recentlySentCoinCount }) => (
  <View
    style={{
      width: circumfrance,
      height: circumfrance,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Surface width={circumfrance} height={circumfrance}>
      <Group>
        <Circle radius={radius} fill={'#d1c008'} />
      </Group>
      <Group x={innerOffset} y={innerOffset}>
        <Circle radius={innerRadius} stroke={'#aa9b12'} strokeWidth={4} />
      </Group>
    </Surface>
    {_.isNumber(recentlySentCoinCount) && (
      <Text
        style={{
          position: 'absolute',
          color: 'white',
          backgroundColor: 'transparent',
          fontFamily: vars.fontBlack,
          fontSize: 28,
          zIndex: 10,
        }}>
        +{recentlySentCoinCount}
      </Text>
    )}
  </View>
);
