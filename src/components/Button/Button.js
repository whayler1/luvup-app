import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import _ from 'lodash';

import { vars, buttons } from '../../styles';
import ButtonInFlightBubble from './ButtonInFlightBubble';

export const BUTTON_STYLES = {
  INFO: {
    buttonStyle: buttons.infoButton,
    buttonStylePress: buttons.infoButtonPress,
    buttonStyleDisabled: buttons.infoButtonDisabled,
    buttonText: buttons.infoText,
    inFlightFill: 'white',
  },
  INFO_SKELETON: {
    buttonStyle: buttons.infoSkeletonButton,
    buttonStylePress: buttons.infoSkeletonButtonPress,
    buttonStyleDisabled: buttons.infoSkeletonButtonDisabled,
    buttonText: buttons.infoSkeletonText,
    inFlightFill: vars.link,
  },
  SECONDARY_SKELETON: {
    buttonStyle: buttons.secondarySkeletonButton,
    buttonStylePress: buttons.secondarySkeletonButtonPress,
    buttonStyleDisabled: buttons.secondarySkeletonButtonDisabled,
    buttonText: buttons.secondarySkeletonText,
    inFlightFill: vars.link,
  },
  DANGER: {
    buttonStyle: buttons.dangerButton,
    buttonStylePress: buttons.dangerButtonPress,
    buttonStyleDisabled: buttons.dangerButtonDisabled,
    buttonText: buttons.dangerText,
    inFlightFill: 'white',
  },
  DANGER_SKELETON: {
    buttonStyle: buttons.dangerSkeletonButton,
    buttonStylePress: buttons.dangerSkeletonButtonPress,
    buttonStyleDisabled: buttons.dangerSkeletonButtonDisabled,
    buttonText: buttons.dangerSkeletonText,
    inFlightFill: vars.danger,
  },
};

class Button extends PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.object,
    title: PropTypes.string,
    isInFlight: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    buttonStyles: BUTTON_STYLES.INFO,
    isInFlight: false,
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPress: false,
    };
    this.styles = props.buttonStyles;
  }

  handlePress = () => {
    const {
      props: { disabled, isInFlight, onPress },
    } = this;
    if (!disabled && !isInFlight && _.isFunction(onPress)) {
      onPress();
    }
  };

  handlePressIn = () => {
    this.setState({ isPress: true });
  };

  handlePressOut = () => {
    this.setState({ isPress: false });
  };

  render() {
    const {
      props: {
        title,
        isInFlight,
        onPress,
        disabled,
        buttonStyles: {
          buttonStyle,
          buttonStylePress,
          buttonStyleDisabled,
          buttonText,
          inFlightFill,
        },
      },
      state: { isPress },
      handlePressIn,
      handlePressOut,
    } = this;
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}>
        <View
          style={[
            buttonStyle,
            isPress && buttonStylePress,
            disabled || (isInFlight && buttonStyleDisabled),
          ]}>
          {isInFlight && (
            <View style={buttons.inFlightContainer}>
              {_.times(3, n => (
                <ButtonInFlightBubble
                  fill={inFlightFill}
                  delayAnimationStart={n * 250}
                />
              ))}
            </View>
          )}
          <Text style={[buttonText, isInFlight && { opacity: 0 }]}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Button;
