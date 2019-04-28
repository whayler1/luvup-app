import { StyleSheet } from 'react-native';

import vars from './vars';

const input = {
  alignSelf: 'stretch',
  height: 35,
  borderBottomColor: vars.blueGrey500,
  borderBottomWidth: 2,
  fontFamily: vars.fontRegular,
  fontSize: 20,
  color: vars.blueGrey500,
  marginTop: 4,
  // backgroundColor: 'pink',
};
const inputUnderline = {
  borderBottomColor: vars.link,
  borderBottomWidth: 2,
  height: 2,
  transform: [{ translateY: -2 }],
  width: 0,
  zIndex: 10,
};
const inputUnderlineError = {
  width: '100%',
  borderBottomColor: vars.danger,
};
const multilineInput = {
  ...input,
  height: 40 * 4,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderColor: vars.blueGrey500,
  borderRadius: 4,
  padding: 16,
};
const inputDanger = {
  ...input,
  borderBottomColor: vars.danger,
};
const inputFocus = {
  ...input,
  borderBottomColor: vars.link,
};

export default StyleSheet.create({
  input,
  inputUnderline,
  inputUnderlineError,
  multilineInput,
  inputDanger,
  inputFocus,
  title: {
    fontSize: 30,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 15,
    color: vars.blueGrey500,
  },
  labelFocus: {
    color: vars.link,
  },
  description: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey300,
  },
  error: {
    color: 'red',
    fontFamily: vars.fontRegular,
    fontSize: 15,
    paddingTop: 8,
  },
  formGroup: {
    alignSelf: 'stretch',
    marginTop: vars.gutterAndHalf,
  },
  buttonRow: {
    alignSelf: 'stretch',
    marginTop: 40,
    flexDirection: 'row',
  },
  buttonCell2ColLeft: {
    flex: 0.5,
    paddingRight: 8,
  },
  buttonCell2ColRight: {
    flex: 0.5,
    paddingLeft: 8,
  },
});
