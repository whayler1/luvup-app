import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { wells } from '../../styles';

const getViewStyle = type => {
  switch (type) {
    case 'success':
      return wells.success;
    default:
      return wells.error;
  }
};

const getTextStyle = type => {
  switch (type) {
    case 'success':
      return wells.successText;
    default:
      return wells.errorText;
  }
};

const Well = ({ type, text, styles }) => (
  <View style={[getViewStyle(type), styles && styles]}>
    {text && <Text style={getTextStyle(type)}>{text}</Text>}
  </View>
);

Well.propTypes = {
  type: PropTypes.oneOf(['danger', 'warning', 'info', 'success']),
  text: PropTypes.string,
  styles: PropTypes.object,
};

Well.defaultProps = {
  text: '',
};

export default Well;
