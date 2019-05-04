import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import { Animated, Easing, View } from 'react-native';

import Circle from '../Circle';
import { vars } from '../../styles';
import styles from './DashboardTopNav.styles';

const DURATION = 250;
const EASING = Easing.inOut(Easing.linear);
const CIRCUMFRANCE = 90;

const { Value } = Animated;

class DashboardTopNavScoreUpAnimation extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.opacity = new Value(0);
    this.scale = new Value(0.75);
  }

  stopAllAnimations = () => {
    this.opacity.stopAnimation();
  };

  pulseAnimation = () => {
    const { scale } = this;
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 250,
        easing: EASING,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 250,
        easing: EASING,
      }),
    ]).start(o => {
      if (o.finished) {
        this.pulseAnimation();
      }
    });
  };

  startAnimation = () => {
    const { opacity, scale } = this;
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

  componentDidMount() {
    setTimeout(() => this.startAnimation(), 2000);
  }

  render() {
    const { opacity, scale } = this;
    return (
      <View style={styles.scoreUpContainer}>
        <Animated.View
          style={[
            styles.scoreUpBubble,
            { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] },
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
