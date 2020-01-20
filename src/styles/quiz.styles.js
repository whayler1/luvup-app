import { StyleSheet } from 'react-native';

import vars from './vars';

const addChoiceGlyphDefaults = {
  fontSize: 35,
  transform: [{ translateY: -2 }],
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
    alignItems: 'center',
    justifyContent: 'center',
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
  createRewardSubmitContainer: {
    paddingTop: 24,
  },
  questionSmallText: {
    fontFamily: vars.fontRegular,
    color: vars.blueGrey500,
    fontSize: vars.fontL,
    paddingBottom: 16,
    textAlign: 'center',
  },
  answerText: {
    fontFamily: vars.fontRegular,
    color: vars.blueGrey500,
    fontSize: 22,
    paddingBottom: 8,
  },
  reviewRewardWrapper: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: -8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reviewRewardItem: {
    marginHorizontal: 8,
  },
  successContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  successWrapper: {
    marginHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  successTextWrapper: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  successText: {
    fontSize: 30,
    fontFamily: vars.fontRegular,
    color: vars.blueGrey500,
  },
  viewQuizSubmitWrapper: {
    marginTop: 24,
  },
  viewQuizSubmitError: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  viewQuizHead: {
    backgroundColor: vars.razzleDazzleRose,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
  },
  viewQuizDetails: {
    fontFamily: vars.fontRegular,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    zIndex: 10,
  },
  viewQuizDetailsBold: {
    fontFamily: vars.fontBlack,
    fontSize: 24,
  },
  viewQuizDetailsNewLine: {
    paddingTop: 24,
  },
  viewQuizDetailsDirections: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: vars.fontBlack,
    // marginTop: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  viewQuizWrongAnswerReaction: {
    marginTop: 24,
    fontFamily: vars.fontBlack,
    fontSize: 23,
    color: vars.red500,
    textAlign: 'center',
  },
});
