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
    buttonText: buttons.infoText,
    inFlightFill: 'white',
  },
  INFO_SKELETON: {
    buttonStyle: buttons.infoSkeletonButton,
    buttonStylePress: buttons.infoSkeletonButtonPress,
    buttonText: buttons.infoSkeletonText,
    inFlightFill: vars.link,
  },
  SECONDARY_SKELETON: {
    buttonStyle: buttons.secondarySkeletonButton,
    buttonStylePress: buttons.secondarySkeletonButtonPress,
    buttonText: buttons.secondarySkeletonText,
    inFlightFill: vars.link,
  },
  DANGER: {
    buttonStyle: buttons.dangerButton,
    buttonStylePress: buttons.dangerButtonPress,
    buttonText: buttons.dangerText,
    inFlightFill: 'white',
  },
  DANGER_SKELETON: {
    buttonStyle: buttons.dangerSkeletonButton,
    buttonStylePress: buttons.dangerSkeletonButtonPress,
    buttonText: buttons.dangerSkeletonText,
    inFlightFill: vars.danger,
  },
};

class Button extends PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.object,
    title: PropTypes.string,
    isInFlight: PropTypes.boolean,
  };

  static defaultProps = {
    buttonStyles: BUTTON_STYLES.INFO,
    isInFlight: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPress: false,
    };
    this.styles = props.buttonStyles;
  }

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
        buttonStyles: {
          buttonStyle,
          buttonStylePress,
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <View style={[buttonStyle, isPress && buttonStylePress]}>
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
          <Text style={buttonText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Button;
