import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';
import { Animated, Easing } from 'react-native';

import Circle from '../Circle';
import { vars } from '../../styles';

const DURATION = 250;
const EASING = Easing.inOut(Easing.linear);

class ButtonInFlightBubble extends PureComponent {
  static propTypes = {
    circumfrance: PropTypes.number,
    opacityMin: PropTypes.number,
    opacityMax: PropTypes.number,
    delayAnimationStart: PropTypes.number,
  };

  static defaultProps = {
    circumfrance: 16,
    opacityMin: 0.5,
    opacityMax: 1,
    delayAnimationStart: 0,
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
      props: { circumfrance },
      opacity,
    } = this;
    return (
      <Animated.View style={{ opacity }}>
        <Surface width={circumfrance} height={circumfrance}>
          <Circle radius={circumfrance / 2} fill="white" />
        </Surface>
      </Animated.View>
    );
  }
}

export default ButtonInFlightBubble;
