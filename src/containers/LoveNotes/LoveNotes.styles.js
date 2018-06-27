import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  renderItemWrap: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: vars.blueGrey50,
  },
  titleText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey700,
    fontSize: 14,
  }
});
