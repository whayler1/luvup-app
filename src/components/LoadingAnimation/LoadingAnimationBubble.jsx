import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import { Animated, Easing } from 'react-native';

import Circle from '../Circle';

const DURATION = 250;
const EASING = Easing.inOut(Easing.linear);

class LoadingAnimation extends PureComponent {
  static propTypes = {
    circumfrance: PropTypes.number,
    opacityMin: PropTypes.number,
    opacityMax: PropTypes.number,
    delayAnimationStart: PropTypes.number,
    fill: PropTypes.string,
  };

  static defaultProps = {
    circumfrance: 12,
    opacityMin: 0.5,
    opacityMax: 1,
    delayAnimationStart: 0,
    fill: 'white',
  };

  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0.5);
  }

  flashOpacity = () => {
    const {
      opacity,
      props: { opacityMin, opacityMax },
    } = this;

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: opacityMax,
        duration: DURATION,
        easing: EASING,
      }),
      Animated.timing(opacity, {
        toValue: opacityMin,
        duration: DURATION,
        easing: EASING,
      }),
    ]).start(o => {
      if (o.finished) {
        this.timeout = setTimeout(() => {
          this.flashOpacity();
        }, DURATION * 2);
      }
    });
  };

  startAnimation = () => {
    this.timeout = setTimeout(() => {
      this.flashOpacity();
    }, this.props.delayAnimationStart);
  };

  stopAnimation = () => {
    clearTimeout(this.timeout);
    this.opacity.stopAnimation();
  };

  componentDidMount() {
    this.startAnimation();
  }

  componetWillUnmount() {
    this.stopAnimation();
  }

  render() {
    const {
      props: { circumfrance, fill },
      opacity,
    } = this;
    return (
      <Animated.View style={{ opacity, paddingHorizontal: 4 }}>
        <Surface width={circumfrance} height={circumfrance}>
          <Circle radius={circumfrance / 2} fill={fill} />
        </Surface>
      </Animated.View>
    );
  }
}

export default LoadingAnimation;
