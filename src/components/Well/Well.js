import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { Ionicons } from '@expo/vector-icons';

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

const getDismissColor = (type) => {
  switch (type) {
    case WELL_TYPES.INFO:
    case WELL_TYPES.INFO_SKELETON:
      return vars.info;
    default:
      return vars.danger;
  }
};

const ConditionalWrap = ({ condition, Wrap, children }) =>
  condition ? <Wrap>{children}</Wrap> : children;

const Well = ({ type, title, text, styles, onPress, onDismissPress }) => (
  <ConditionalWrap
    condition={isFunction(onPress)}
    Wrap={function Wrap({ children }) {
      return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
    }}
  >
    <View style={[getViewStyle(type), styles && styles]}>
      <ConditionalWrap
        condition={isFunction(onDismissPress)}
        Wrap={function DismissWrap({ children }) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {children}
              </View>
              <View
                style={{
                  marginLeft: vars.gutter,
                }}
              >
                <TouchableOpacity>
                  <Ionicons
                    name="md-close"
                    size={30}
                    color={getDismissColor(type)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      >
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
      </ConditionalWrap>
    </View>
  </ConditionalWrap>
);

Well.propTypes = {
  type: PropTypes.oneOf(Object.values(WELL_TYPES)),
  title: PropTypes.string,
  text: PropTypes.string,
  styles: PropTypes.object,
  onPress: PropTypes.func,
  onDismissPress: PropTypes.func,
};

Well.defaultProps = {
  text: '',
};

export default Well;
