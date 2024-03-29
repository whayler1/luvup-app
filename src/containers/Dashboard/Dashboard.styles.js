import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  tabsContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    paddingTop: vars.gutterHalf,
    paddingBottom: vars.gutter,
  },
  tabsItem: {
    alignItems: 'center',
  },
  tabsText: {
    fontSize: 12,
    color: vars.blueGrey300,
    fontFamily: vars.fontBlack,
    marginTop: 8,
  },
});
