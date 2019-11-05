import times from 'lodash/times';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { buttons } from '../../styles';
import LoadingAnimationBubble from './LoadingAnimationBubble';

const LoadingAnimation = ({ fill = '#ffffff' }) => (
  <View style={buttons.inFlightContainer}>
    {times(3, n => (
      <LoadingAnimationBubble
        key={n}
        fill={fill}
        delayAnimationStart={n * 250}
      />
    ))}
  </View>
);

LoadingAnimation.propTypes = {
  fill: PropTypes.string,
};

export default LoadingAnimation;
