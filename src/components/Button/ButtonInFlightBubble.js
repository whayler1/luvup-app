import React from 'react';
import PropTypes from 'prop-types';
import { Surface } from 'ReactNativeART';

import Circle from '../Circle';
import { vars } from '../../styles';

const ButtonInFlightBubble = ({ circumfrance }) => (
  <Surface width={circumfrance} height={circumfrance}>
    <Circle radius={circumfrance / 2} fill="white" />
  </Surface>
);

ButtonInFlightBubble.propTypes = {
  circumfrance: PropTypes.number,
};

ButtonInFlightBubble.defaultProps = {
  circumfrance: 16,
};

export default ButtonInFlightBubble;
