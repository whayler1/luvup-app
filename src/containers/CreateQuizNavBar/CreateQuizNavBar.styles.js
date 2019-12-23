import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  navBarWrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navBarBack: {},
  navBarPressableText: {
    fontFamily: vars.fontBlack,
    fontSize: 16,
    color: vars.link,
  },
});
