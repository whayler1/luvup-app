import { StyleSheet } from 'react-native';

import vars from './vars';

const input = {
  alignSelf: 'stretch',
  height: 40,
  borderBottomColor: vars.blueGrey500,
  borderBottomWidth: 2,
  fontFamily: vars.fontRegular,
  fontSize: 20,
  color: vars.blueGrey500,
  marginTop: 4,
};
const inputDanger = {
  ...input,
  borderBottomColor: vars.danger,
}
const inputFocus = {
  ...input,
  borderBottomColor: vars.link,
}

export default StyleSheet.create({
  input,
  inputDanger,
  inputFocus,
  title: {
    fontSize: 30,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey500,
  },
  error: {
    color: 'red',
  },
  formGroup: {
    alignSelf: 'stretch',
    marginTop: 32,
  },
  buttonRow: {
    alignSelf: 'stretch',
    marginTop: 40,
    flexDirection: 'row',
  },
});
