import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: vars.blue500,
    padding: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 4,
    right: 8,
  },
  copyContainer: {
    paddingRight: 32,
  }
});
