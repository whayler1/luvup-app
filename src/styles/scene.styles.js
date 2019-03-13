import { StyleSheet } from 'react-native';

import vars from './vars';

const topNav = {
  position: 'absolute',
  backgroundColor: 'white',
  top: 0,
  left: 0,
  right: 0,
  paddingTop: 16,
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 8,
  marginTop: 28,
  zIndex: 10,
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
  marginTop: 50,
  alignSelf: 'stretch',
  paddingVertical: 32,
  paddingHorizontal: 16,
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
  copy: {
    color: vars.p,
    fontFamily: vars.fontRegular,
    fontSize: 20,
  },
  gutterTop: {
    marginTop: vars.gutter,
  },
});
