import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import { wells, vars } from '../../styles';

export const WELL_TYPES = {
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  INFO_SKELETON: 'info-skeleton',
  SUCCESS: 'success',
};

const getViewStyle = (type) => {
  switch (type) {
    case WELL_TYPES.SUCCESS:
      return wells.success;
    case WELL_TYPES.INFO:
      return wells.info;
    case WELL_TYPES.INFO_SKELETON:
      return wells.infoSkeleton;
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
    case WELL_TYPES.INFO_SKELETON:
      return wells.infoSkeletonText;
    default:
      return wells.errorText;
  }
};

const ConditionalWrap = ({ condition, Wrap, children }) =>
  condition ? <Wrap>{children}</Wrap> : children;

const Well = ({ type, title, text, styles, onPress }) => (
  <ConditionalWrap
    condition={isFunction(onPress)}
    Wrap={function({ children }) {
      return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
    }}
  >
    <View style={[getViewStyle(type), styles && styles]}>
      {title && (
        <Text
          style={[
            getTextStyle(type),
            { fontFamily: vars.fontBlack, marginBottom: vars.gutterHalf },
          ]}
        >
          {title}
        </Text>
      )}
      {text && <Text style={getTextStyle(type)}>{text}</Text>}
    </View>
  </ConditionalWrap>
);

Well.propTypes = {
  type: PropTypes.oneOf(Object.values(WELL_TYPES)),
  title: PropTypes.string,
  text: PropTypes.string,
  styles: PropTypes.object,
  onPress: PropTypes.func,
};

Well.defaultProps = {
  text: '',
};

export default Well;
