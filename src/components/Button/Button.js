import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import _ from 'lodash';

import { vars, buttons } from '../../styles';
import ButtonInFlightBubble from './ButtonInFlightBubble';

export const BUTTON_STYLES = {
  INFO: {
    buttonStyle: buttons.infoButton,
    buttonText: buttons.infoText,
    inFlightFill: 'white',
  },
  INFO_SKELETON: {
    buttonStyle: buttons.infoSkeletonButton,
    buttonText: buttons.infoSkeletonText,
    inFlightFill: vars.link,
  },
  SECONDARY_SKELETON: {
    buttonStyle: buttons.secondarySkeletonButton,
    buttonText: buttons.secondarySkeletonText,
    inFlightFill: vars.link,
  },
  DANGER: {
    buttonStyle: buttons.dangerButton,
    buttonText: buttons.dangerText,
    inFlightFill: 'white',
  },
  DANGER_SKELETON: {
    buttonStyle: buttons.dangerSkeletonButton,
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

    this.styles = props.buttonStyles;
  }

  render() {
    const {
      props: {
        title,
        isInFlight,
        buttonStyles: { buttonStyle, buttonText, inFlightFill },
      },
    } = this;
    return (
      <TouchableWithoutFeedback>
        <View style={buttonStyle}>
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
