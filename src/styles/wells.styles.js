import { StyleSheet } from 'react-native';
import vars from './vars';
import Color from 'color';

const container = {
  alignSelf: 'stretch',
  paddingHorizontal: 8,
  paddingVertical: 16,
  borderLeftWidth: 3,
  marginVertical: 8,
};
const error = {
  ...container,
  backgroundColor: Color(vars.danger).lighten(0.65),
  borderLeftColor: vars.danger,
};
const success = {
  ...container,
  backgroundColor: Color(vars.success).lighten(0.85),
  borderLeftColor: vars.success,
};
const text = {
  alignSelf: 'center',
};
const errorText = {
  ...text,
  color: vars.danger,
};
const successText = {
  ...text,
  color: vars.success,
};

export default StyleSheet.create({
  error,
  errorText,
  success,
  successText,
});