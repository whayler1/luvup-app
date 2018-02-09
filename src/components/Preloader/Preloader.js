import React, { PureComponent } from 'react'
import {
  View,
  Animated,
  Easing,
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
import PropTypes from 'prop-types';

import { vars } from '../../styles';

const circumfrance = 60;
const radius = circumfrance / 2;

export default class Preloader extends PureComponent {
  static propTypes = {
    marginTop: PropTypes.number,
  };

  spinValue = new Animated.Value(0);

  spin () {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  componentDidMount() {
    this.spin();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.View
        style={{
          alignSelf: 'stretch',
          alignItems: 'center',
          marginTop: this.props.marginTop || 0,
          transform: [{
            rotate: spin
          }]
        }}
      >
        <Svg
          width={circumfrance + 4}
          height={circumfrance + 4}
        >
          <Rect
            stroke={vars.blue500}
            strokeWidth={4}
            fill="transparent"
            x={2}
            y={2}
            width={circumfrance}
            height={circumfrance}
            rx={radius}
          />
          <G>
            <Rect
              fill="white"
              x={14}
              y={0}
              width={20}
              height={20}
            />
          </G>
        </Svg>
      </Animated.View>
    );
  }
};
