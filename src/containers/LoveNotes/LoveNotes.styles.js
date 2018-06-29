import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  renderItemWrap: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  titleText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey700,
    fontSize: 14,
  },
  titleTextSecondary: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey300,
    fontSize: 14,
  },
  tokenWrap: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },
  tokenUi: {
    flexDirection: 'row',
    alignContent: 'center',
    marginRight: 16,
  },
  tokenText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey700,
    fontSize: 14,
  },
});
