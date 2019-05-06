import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  topNav: {
    paddingTop: vars.gutterHalf,
    zIndex: 20,
  },
  group: {
    marginTop: 32,
  },
  title: {
    color: vars.blueGrey800,
    fontSize: 27,
    fontFamily: vars.fontBlack,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey500,
    marginTop: 16,
  },
  value: {
    fontSize: 20,
    color: vars.blueGrey500,
    marginTop: 4,
  },
  scrollView: {
    alignSelf: 'stretch',
    paddingVertical: vars.gutter,
    paddingHorizontal: vars.gutter,
    flex: 1,
  },
  scrollViewContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
