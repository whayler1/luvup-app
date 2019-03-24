import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  input: {
    fontFamily: vars.fontRegular,
    height: 40,
    color: vars.blueGrey500,
    fontSize: 20,
    borderColor: vars.blueGrey300,
    borderWidth: 1,
    borderRadius: 3,
    width: 40,
    textAlign: 'center',
  },
  inputFocus: {
    borderColor: vars.link,
  },
});
