import { StyleSheet } from 'react-native';

import vars from './vars';

const topNav = {
  backgroundColor: 'white',
  paddingTop: vars.gutter,
  paddingLeft: vars.gutterHalf,
  paddingRight: vars.gutterHalf,
  paddingBottom: vars.gutterHalf,
  zIndex: 10,
  alignSelf: 'stretch',
};
const safeAreaView = {
  flex: 1,
};
const container = {
  flex: 1,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
};
const keyboardAvoidingView = {
  ...container,
  alignSelf: 'stretch',
};
const content = {
  alignSelf: 'stretch',
  paddingTop: vars.gutterHalf,
  paddingBottom: vars.gutterAndHalf,
  paddingHorizontal: vars.gutter,
  flex: 1,
};
const contentNoTop = {
  ...content,
  marginTop: 0,
};
const titleCopy = {
  fontSize: 32,
  fontFamily: vars.fontRegular,
  color: vars.blueGrey700,
};
const largeCopy = {
  fontSize: 24,
  fontFamily: vars.fontRegular,
  color: vars.blueGrey500,
};
const bodyCopy = {
  fontSize: 16,
  fontFamily: vars.fontRegular,
  color: vars.blueGrey500,
};
const textCenter = {
  textAlign: 'center',
};

export default StyleSheet.create({
  textCenter,
  titleCopy,
  largeCopy,
  bodyCopy,
  safeAreaView,
  container,
  keyboardAvoidingView,
  topNav,
  topNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 0,
  },
  content,
  contentNoTop,
  contentTop: {
    flex: 1,
    justifyContent: 'center',
  },
  contentBottom: {
    flex: 0,
  },
  copy: {
    color: vars.p,
    fontFamily: vars.fontRegular,
    fontSize: 20,
  },
  gutterHalfTop: {
    marginTop: vars.gutterHalf,
  },
  gutterTop: {
    marginTop: vars.gutter,
  },
  gutterDoubleTop: {
    marginTop: vars.gutterDouble,
  },
});
