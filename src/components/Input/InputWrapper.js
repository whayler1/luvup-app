import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { forms } from '../../styles';

const InputWrapper = ({ label, error, formGroupStyles, children, isFocus }) => (
  <View style={[forms.formGroup, ...formGroupStyles]}>
    <Text style={(forms.label, isFocus && forms.labelFocus)}>{label}</Text>
    {children}
    {error.length > 0 && <Text style={forms.error}>{error}</Text>}
  </View>
);

InputWrapper.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  formGroupStyles: PropTypes.array,
  children: PropTypes.node,
  isFocus: PropTypes.bool,
};

InputWrapper.defaultProps = {
  error: '',
};

export default InputWrapper;
