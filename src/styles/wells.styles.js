import { StyleSheet } from 'react-native';
import vars from './vars';
import Color from 'color';

const container = {
  paddingHorizontal: 8,
  paddingVertical: 16,
  borderLeftWidth: 3,
  marginVertical: 8,
};
const info = {
  ...container,
  backgroundColor: Color(vars.info).lighten(0.99),
  borderLeftColor: vars.info,
};
const infoSkeleton = {
  ...container,
  borderWidth: 1,
  borderRadius: 2,
  borderColor: vars.info,
  backgroundColor: 'white',
  shadowColor: 'rgba(0,0,0,0.2)',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowRadius: 2,
  shadowOpacity: 1,
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
  textAlign: 'center',
};
const errorText = {
  ...text,
  color: vars.danger,
};
const infoText = {
  ...text,
  color: vars.info,
};
const successText = {
  ...text,
  color: vars.success,
};

export default StyleSheet.create({
  info,
  infoText,
  infoSkeleton,
  infoSkeletonText: infoText,
  error,
  errorText,
  success,
  successText,
});
