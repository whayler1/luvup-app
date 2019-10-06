import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, Easing } from 'react-native';
import _ from 'lodash';

import { forms, vars } from '../../styles';

const LABEL_INACTIVE_Y = 20;
const LABEL_ACTIVE_Y = 0;
const LABEL_INACTIVE_SIZE = 20;
const LABEL_ACTIVE_SIZE = 15;
const ANIMATED_DURATION = 250;
const EASING_ACTIVE = Easing.in(Easing.linear);
const EASING_INACTIVE = Easing.out(Easing.linear);
const UNDERLINE_BLUR_WIDTH = 0;
const UNDERLINE_FOCUS_WIDTH = 100;

class InputWrapper extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    formGroupStyles: PropTypes.array,
    children: PropTypes.node,
    isFocus: PropTypes.bool,
    value: PropTypes.string,
    disableErrorUnderline: PropTypes.bool,
  };

  static defaultProps = {
    error: '',
    formGroupStyles: [],
    disableErrorUnderline: false,
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
    this.underlineWidth = new Animated.Value(UNDERLINE_BLUR_WIDTH);
  }

  stopAnimations = () => {
    this.labelY.stopAnimation();
    this.labelSize.stopAnimation();
  };
  stopUnderlineAnimation = () => {
    this.underlineWidth.stopAnimation();
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

  animateFocus = () => {
    this.stopUnderlineAnimation();

    Animated.timing(this.underlineWidth, {
      toValue: UNDERLINE_FOCUS_WIDTH,
      duration: ANIMATED_DURATION,
      easing: EASING_INACTIVE,
    }).start();
  };

  animateBlur = () => {
    this.stopUnderlineAnimation();

    Animated.timing(this.underlineWidth, {
      toValue: UNDERLINE_BLUR_WIDTH,
      duration: ANIMATED_DURATION,
      easing: EASING_INACTIVE,
    }).start();
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
    if (!prevProps.isFocus && this.props.isFocus) {
      this.animateFocus();
    } else if (prevProps.isFocus && !this.props.isFocus) {
      this.animateBlur();
    }
  }

  labelColor = () => {
    const { error, value, isFocus } = this.props;

    if (_.isString(error) && error.length > 0) {
      return vars.danger;
    }
    if (!this.isValueLength(value) && !isFocus) {
      return vars.blueGrey500;
    }
    return vars.blueGrey700;
  };

  render() {
    const {
      props: { label, error, formGroupStyles, children },
      labelY,
      labelSize,
      labelColor,
      underlineWidth,
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
                color: labelColor(),
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
        <Animated.View
          style={[
            forms.inputUnderline,
            this.props.error && !this.props.disableErrorUnderline
              ? forms.inputUnderlineError
              : {
                  width: underlineWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
          ]}
        />
        {error.length > 0 && <Text style={forms.error}>{error}</Text>}
      </View>
    );
  }
}

export default InputWrapper;
