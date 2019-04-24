import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  contentTop: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleCopy: {
    marginTop: vars.gutterDouble,
  },
  sloganCopy: {
    marginTop: vars.gutterHalf,
    color: vars.blueGrey700,
  },
  promptCopy: {
    marginTop: vars.gutterTriple,
  },
  subPromptCopy: {
    marginTop: vars.gutterAndHalf,
  },
  button: {
    marginTop: vars.gutterDouble,
  },
  resentText: {
    fontSize: 20,
    fontFamily: vars.fontRegular,
    color: vars.green500,
    height: 37,
    textAlign: 'center',
  },
});
