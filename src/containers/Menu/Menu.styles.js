import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  group: {
    marginTop: 32,
  },
  title: {
    color: vars.blueGrey800,
    fontSize: 27,
    fontFamily: vars.fontBlack,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey500,
    marginTop: 16,
  },
  value: {
    fontSize: 20,
    color: vars.blueGrey500,
    marginTop: 4,
  },
});
