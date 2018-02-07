import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import { vars } from '../../styles';

export default ({
  recentlySentJalapenoCount
}) => (
  <View>
    <Svg
      width={76}
      height={100}
    >
      <Path
        fill={vars.jalapeno}
        d="M24.708,0 C12.038,4.123 11.193,24.074 11.193,24.074 C1.056,28.509 0.004,37.568 2.770123e-15,41.179 C-0.054,84.681 51.104,106.707 73.7,98.196 C74.436,97.919 76.715,96.122 73.879,94.606 C61.241,87.848 26.134,63.515 28.208,33.852 C28.472,30.088 27.242,23.019 16.895,23.863 C16.895,23.863 16.672,6.307 28.791,4.123 L24.708,0 Z"
      />
    </Svg>
    <Text
      style={{
        position: 'absolute',
        top: 6,
        right: 0,
        fontFamily: 'latoblack',
        fontSize: 26,
        color: vars.jalapeno,
      }}
    >+{ recentlySentJalapenoCount + 1 }</Text>
  </View>
);
