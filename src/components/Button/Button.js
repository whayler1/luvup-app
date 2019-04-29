import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import _ from 'lodash';

import { buttons } from '../../styles';
import ButtonInFlightBubble from './ButtonInFlightBubble';

export const STYLES = {
  INFO: {
    buttonStyle: buttons.infoButton,
    buttonText: buttons.infoText,
  },
  INFO_SKELETON: {
    buttonStyle: buttons.infoSkeletonButton,
    buttonText: buttons.infoSkeletonText,
  },
  SECONDARY_SKELETON: {
    buttonStyle: buttons.secondarySkeletonButton,
    buttonText: buttons.secondarySkeletonText,
  },
  DANGER: {
    buttonStyle: buttons.dangerButton,
    buttonText: buttons.dangerText,
  },
  DANGER_SKELETON: {
    buttonStyle: buttons.dangerSkeletonButton,
    buttonText: buttons.dangerSkeletonText,
  },
};

class Button extends PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.object,
    title: PropTypes.string,
  };

  static defaultProps = {
    buttonStyles: STYLES.INFO,
  };

  constructor(props) {
    super(props);

    this.styles = props.buttonStyles;
  }

  render() {
    const {
      props: {
        title,
        buttonStyles: { buttonStyle, buttonText },
      },
    } = this;
    return (
      <View style={buttonStyle}>
        {_.times(3, n => (
          <ButtonInFlightBubble delayAnimationStart={n * 250} />
        ))}
        <Text style={buttonText}>{title}</Text>
      </View>
    );
  }
}

export default Button;
