import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  group: {
    marginTop: 32,
  },
  title: {
    fontFamily: vars.fontBlack,
    fontSize: 30,
    color: vars.blueGrey800,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey500,
    marginTop: 16,
  },
  value: {
    fontSize: vars.fontRegular,
    fontSize: 20,
    color: vars.blueGrey500,
    marginTop: 4,
  },
});
