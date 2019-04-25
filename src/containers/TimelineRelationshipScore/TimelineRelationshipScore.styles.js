import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  renderItemContainer: {
    paddingHorizontal: vars.gutter,
    paddingBottom: vars.gutter,
    alignItems: 'center',
  },
  renderItemText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey500,
    fontSize: 12,
  },
  renderItemScoreContainer: {
    flex: 1,
    width: 70,
    paddingTop: 43,
    paddingBottom: 43,
    marginTop: vars.gutter,
  },
  renderItemScore: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderItemBubble: { position: 'absolute' },
  renderItemScoreText: {
    fontFamily: vars.fontBlack,
    color: 'white',
    fontSize: 18,
  },
  separator: {
    borderRightColor: vars.blueGrey50,
    borderRightWidth: 1,
  },
  headerContainer: {
    flex: 0,
    paddingTop: vars.gutterHalf,
    paddingBottom: vars.gutterHalf,
    paddingRight: vars.gutterHalf,
  },
});
