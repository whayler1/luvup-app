import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Group, Surface } from 'ReactNativeART';

import Circle from '../Circle';
import { vars } from '../../styles';

const NotificationDot = ({ style = {} }) => (
  <View
    style={[
      {
        position: 'absolute',
        right: -6,
        top: -6,
        zIndex: 10,
      },
      style,
    ]}>
    <Surface width={18} height={18}>
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

NotificationDot.propTypes = {
  style: PropTypes.object,
};

export default NotificationDot;
