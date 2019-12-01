import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { wells } from '../../styles';

export const WELL_TYPES = {
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

const getViewStyle = (type) => {
  switch (type) {
    case WELL_TYPES.SUCCESS:
      return wells.success;
    case WELL_TYPES.INFO:
      return wells.info;
    default:
      return wells.error;
  }
};

const getTextStyle = (type) => {
  switch (type) {
    case WELL_TYPES.SUCCESS:
      return wells.successText;
    case WELL_TYPES.INFO:
      return wells.infoText;
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
  type: PropTypes.oneOf(Object.values(WELL_TYPES)),
  text: PropTypes.string,
  styles: PropTypes.object,
};

Well.defaultProps = {
  text: '',
};

export default Well;
