import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  menuButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButtonText: {
    fontFamily: vars.fontBlack,
    fontSize: vars.fontS,
    color: vars.blueGrey500,
  },
});
