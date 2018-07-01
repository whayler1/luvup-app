import React from 'react';
import { View } from 'react-native';
import ReactArt, {
  Group,
  Shape,
  Surface,
  Transform,
} from 'ReactNativeART';

import Circle from '../Circle';
import { vars } from '../../styles';

const NotificationDot = ({ style }) => (
  <View
    style={{
      position: 'absolute',
      right: -6,
      top: -6,
      zIndex: 10,
    }}
  >
    <Surface
      width={16}
      height={16}
    >
      <Group>
        <Circle
          radius={8}
          fill={vars.red500}
          stroke="#ffffff"
          strokeWidth={3}
        />
      </Group>
    </Surface>
  </View>
);

export default NotificationDot;
