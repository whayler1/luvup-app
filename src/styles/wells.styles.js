import { StyleSheet } from 'react-native';
import vars from './vars';
import Color from 'color';

export default StyleSheet.create({
  error: {
    alignSelf: 'stretch',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: Color(vars.danger).lighten(0.65),
    borderLeftColor: vars.danger,
    borderLeftWidth: 3,
    marginVertical: 8,
  },
  errorText: {
    color: vars.danger,
    alignSelf: 'center',
  },
});
