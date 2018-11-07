import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  rewardContainer: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  luvupUiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  luvupUiItem: {},
  choicesCointainer: {
    paddingVertical: 16,
  },
  choicesList: {
    paddingVertical: 16,
  },
  addChoiceButtonWrapper: {
    marginTop: 24,
  },
  addChoiceButton: {
    width: 32,
    height: 32,
  },
  addChoiceGlyph: {
    color: vars.blueGrey500,
    fontSize: 30,
    position: 'absolute',
    left: 7,
    bottom: 0,
  },
});
