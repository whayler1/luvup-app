import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, Easing } from 'react-native';
import _ from 'lodash';

import { forms, vars } from '../../styles';

const LABEL_INACTIVE_Y = 20;
const LABEL_ACTIVE_Y = 0;
const LABEL_INACTIVE_SIZE = 23;
const LABEL_ACTIVE_SIZE = 15;
const ANIMATED_DURATION = 150;
const EASING_ACTIVE = Easing.in(Easing.linear);
const EASING_INACTIVE = Easing.out(Easing.linear);

class InputWrapper extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    formGroupStyles: PropTypes.array,
    children: PropTypes.node,
    isFocus: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    formGroupStyles: [],
  };

  constructor(props) {
    super(props);

    const isValueLength = this.isValueLength(props.value);

    this.labelY = new Animated.Value(
      isValueLength ? LABEL_ACTIVE_Y : LABEL_INACTIVE_Y
    );
    this.labelSize = new Animated.Value(
      isValueLength ? LABEL_ACTIVE_SIZE : LABEL_INACTIVE_SIZE
    );
  }

  stopAnimations = () => {
    this.labelY.stopAnimation();
    this.labelSize.stopAnimation();
  };

  animateActive = () => {
    this.stopAnimations();

    Animated.parallel([
      Animated.timing(this.labelY, {
        toValue: LABEL_ACTIVE_Y,
        duration: ANIMATED_DURATION,
        easing: EASING_ACTIVE,
      }),
      Animated.timing(this.labelSize, {
        toValue: LABEL_ACTIVE_SIZE,
        duration: ANIMATED_DURATION,
        easing: EASING_ACTIVE,
      }),
    ]).start();
  };

  animateInactive = () => {
    this.stopAnimations();

    Animated.parallel([
      Animated.timing(this.labelY, {
        toValue: LABEL_INACTIVE_Y,
        duration: ANIMATED_DURATION,
        easing: EASING_INACTIVE,
      }),
      Animated.timing(this.labelSize, {
        toValue: LABEL_INACTIVE_SIZE,
        duration: ANIMATED_DURATION,
        easing: EASING_INACTIVE,
      }),
    ]).start();
  };

  isValueLength = value => _.isString(value) && value.length > 0;

  shouldTransitionToActive = prevProps =>
    !prevProps.isFocus &&
    !this.isValueLength(prevProps.value) &&
    this.props.isFocus;

  shouldTransitionToInactive = prevProps =>
    prevProps.isFocus &&
    !this.isValueLength(prevProps.value) &&
    !this.props.isFocus;

  componentDidUpdate(prevProps) {
    if (this.shouldTransitionToActive(prevProps)) {
      this.animateActive();
    } else if (this.shouldTransitionToInactive(prevProps)) {
      this.animateInactive();
    }
  }

  render() {
    const {
      props: { label, error, formGroupStyles, children },
      labelY,
      labelSize,
    } = this;
    return (
      <View style={[forms.formGroup, ...formGroupStyles]}>
        <View
          style={{
            height: 15,
          }}>
          <Animated.Text
            style={[
              forms.label,
              {
                fontFamily: vars.fontRegular,
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: labelSize,
                transform: [{ translateY: labelY }],
              },
            ]}>
            {label}
          </Animated.Text>
        </View>
        {children}
        {error.length > 0 && <Text style={forms.error}>{error}</Text>}
      </View>
    );
  }
}

export default InputWrapper;
