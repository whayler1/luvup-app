import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  keyboardScrollView: { flex: 1 },
  formRowWrap: {
    flexDirection: 'row',
  },
  formRowLeft: {
    flex: 0.5,
    paddingRight: 8,
  },
  formRowRight: {
    flex: 0.5,
    paddingLeft: 8,
  },
  submitWrap: {
    flex: 1,
  },
  contentNoTop: {
    marginBottom: vars.gutterTriple,
  },
});
