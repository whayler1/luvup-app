import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  submitButtonContainer: {
    marginBottom: 80,
  },
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
  choiceItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  choiceItemCheckboxWrapper: {
    marginRight: 16,
    marginTop: 5,
  },
  choiceItemInputWrapper: {
    flex: 1,
  },
  choiceError: {
    marginBottom: 8,
  },
  addChoiceButton: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  addChoiceGlyph: {
    color: vars.blueGrey500,
    fontSize: 30,
    position: 'absolute',
    left: 7,
    bottom: 0,
  },
  addChoiceGlyphDisabled: {
    color: vars.blueGrey100,
    fontSize: 30,
    position: 'absolute',
    left: 7,
    bottom: 0,
  },
  removeChoiceButton: {
    width: 32,
    height: 32,
  },
  removeChoiceGlyph: {
    color: vars.blueGrey500,
    fontSize: 30,
    transform: [{ rotate: '45deg' }],
  },
  creatQuizLengthUiWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  maxChoiceLengthError: {
    marginTop: 8,
    color: vars.red500,
    fontFamily: vars.fontRegular,
    fontSize: 16,
  },
});
