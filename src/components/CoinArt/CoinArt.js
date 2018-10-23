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
}) => (
  <View
    style={{
      width: circumfrance,
      height: circumfrance,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Surface width={circumfrance} height={circumfrance}>
      <Group>
        <Circle radius={radius} fill={fill} />
      </Group>
      <Group x={innerOffset} y={innerOffset}>
        <Circle radius={innerRadius} stroke={stroke} strokeWidth={4} />
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
