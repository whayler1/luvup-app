import React from 'react';
import { Text, View } from 'react-native';
import { Group, Surface } from 'ReactNativeART';
import _ from 'lodash';

import Circle from '../Circle';
import { vars } from '../../styles';

const circumfrance = 80;
const radius = circumfrance / 2;
const innerOffset = 8;
const innerRadius = radius - innerOffset;

export default ({
  recentlySentCoinCount,
  fill = '#d1c008',
  stroke = '#aa9b12',
  scale = 1,
}) => (
  <View
    style={{
      width: circumfrance * scale,
      height: circumfrance * scale,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Surface width={circumfrance * scale} height={circumfrance * scale}>
      <Group>
        <Circle radius={radius * scale} fill={fill} />
      </Group>
      <Group x={innerOffset * scale} y={innerOffset * scale}>
        <Circle
          radius={innerRadius * scale}
          stroke={stroke}
          strokeWidth={4 * scale}
        />
      </Group>
    </Surface>
    {_.isNumber(recentlySentCoinCount) && (
      <Text
        style={{
          position: 'absolute',
          color: 'white',
          backgroundColor: 'transparent',
          fontFamily: vars.fontBlack,
          fontSize: 28 * scale,
          zIndex: 10,
          transform: [{ translateY: -2 }],
        }}
      >
        +{recentlySentCoinCount}
      </Text>
    )}
  </View>
);
