import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import { Animated, Easing, View } from 'react-native';

import Circle from '../Circle';
import { vars } from '../../styles';
import styles from './DashboardTopNav.styles';

const EASING = Easing.inOut(Easing.linear);
const CIRCUMFRANCE = 90;

const { Value } = Animated;

class DashboardTopNavScoreUpAnimation extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.opacity = new Value(0);
    this.scale = new Value(0.75);

    this.state = {
      isAnimating: false,
    };
  }

  stopAllAnimations = () => {
    this.opacity.stopAnimation();
    this.scale.stopAnimation();
  };

  pulseAnimation = () => {
    const { scale, opacity } = this;
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 250,
          easing: EASING,
        }),
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 250,
          easing: EASING,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 250,
          easing: EASING,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          easing: EASING,
        }),
      ]),
    ]).start(o => {
      if (o.finished) {
        this.pulseAnimation();
      }
    });
  };

  outAnimation = () => {
    const { stopAllAnimations, opacity, scale } = this;
    stopAllAnimations();
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        delay: 250,
        easing: EASING,
      }),
      Animated.timing(scale, {
        toValue: 3.5,
        duration: 500,
        easing: EASING,
      }),
    ]).start(o => {
      if (o.finished) {
        this.setState({ isAnimating: false });
      }
    });
  };

  startAnimation = () => {
    const { stopAllAnimations, opacity, scale } = this;
    this.setState({ isAnimating: true });
    stopAllAnimations();
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        easing: EASING,
      }),
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 250,
        easing: EASING,
      }),
    ]).start(o => {
      if (o.finished) {
        this.pulseAnimation();
      }
    });
  };

  // componentDidMount() {
  // setTimeout(() => this.startAnimation(), 2000);
  // }

  render() {
    const { opacity, scale } = this;
    return (
      <View style={styles.scoreUpContainer}>
        <Animated.View
          style={[
            styles.scoreUpBubble,
            {
              opacity,
              transform: [
                { scaleX: scale },
                { scaleY: scale },
                { translateY: 27 },
              ],
            },
          ]}>
          <Surface width={CIRCUMFRANCE} height={CIRCUMFRANCE}>
            <Circle radius={CIRCUMFRANCE / 2} fill={vars.razzleDazzleRose} />
          </Surface>
        </Animated.View>
      </View>
    );
  }
}

export default DashboardTopNavScoreUpAnimation;
