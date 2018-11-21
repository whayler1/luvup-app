import { StyleSheet } from 'react-native';

import vars from './vars';

const addChoiceGlyphDefaults = {
  fontSize: 35,
  position: 'absolute',
  left: 12.5,
  bottom: 5,
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  questionButtons: {
    marginTop: 24,
    marginHorizontal: -8,
    flexDirection: 'row',
  },
  questionButtonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  submitButtonContainer: {
    marginBottom: 80,
  },
  rewardContainer: {},
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
  choicesUiWrapper: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  choicesUiItem: {
    marginTop: 24,
    flex: 0.5,
    marginHorizontal: 8,
  },
  createQuizChoiceContainer: {
    paddingTop: 16,
  },
  addChoiceButton: {
    width: 46,
    height: 46,
    marginRight: 16,
  },
  addChoiceGlyph: {
    color: vars.blueGrey500,
    ...addChoiceGlyphDefaults,
  },
  addChoiceGlyphDisabled: {
    color: vars.blueGrey100,
    ...addChoiceGlyphDefaults,
  },
  removeChoiceButton: {
    width: 46,
    height: 46,
  },
  removeChoiceGlyph: {
    color: vars.blueGrey500,
    fontSize: 35,
    paddingTop: 10,
    transform: [{ rotate: '45deg' }],
  },
  creatQuizLengthUiWrapper: {
    flexDirection: 'row',
  },
  maxChoiceLengthError: {
    marginTop: 8,
    color: vars.red500,
    fontFamily: vars.fontRegular,
  },
  questionSmallText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey500,
    fontSize: 22,
    paddingBottom: 16,
  },
  createRewardSubmitContainer: {
    paddingTop: 24,
  },
});
