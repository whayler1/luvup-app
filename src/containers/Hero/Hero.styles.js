import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

const directionsText = {
  color: vars.p,
  fontFamily: vars.fontRegular,
  fontSize: 30,
  alignItems: 'center'
};

export default StyleSheet.create({
  heartView: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartImg: {
    width: 260,
    height: 240,
    zIndex: 10,
  },
  directionsText,
  directionsTextUp: {
    ...directionsText,
    marginBottom: 32,
  },
  directionsTextDown: {
    ...directionsText,
    marginTop: 32,
  }
});
