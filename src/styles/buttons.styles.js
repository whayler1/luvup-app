import { StyleSheet } from 'react-native';
import vars from './vars';

export default StyleSheet.create({
  infoContainer: {
    alignSelf: 'stretch',
  },
  infoButton: {
    backgroundColor: vars.infoButtonBg,
    borderRadius: vars.radius,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: vars.fontBlack,
  },
});
