import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

const directionsText = {
  color: vars.p,
  fontFamily: vars.fontBlack,
  fontSize: 20,
  alignItems: 'center'
};
const loverRequestText = {
  ...directionsText,
  fontSize: 20,
};
const loverRequestTextLarge = {
  ...loverRequestText,
  fontSize: 35,
}

export default StyleSheet.create({
  heartView: {
    alignSelf: 'stretch',
    flex: 1,
    paddingTop: 80,
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
  },
  loverRequestText,
  loverRequestTextLarge,
});
