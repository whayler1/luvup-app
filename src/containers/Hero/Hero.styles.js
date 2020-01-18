import { StyleSheet } from 'react-native';

import { vars } from '../../styles';
import getValuesForWidths from '../../helpers/getValuesForWidths';

const directionsText = {
  color: vars.p,
  fontFamily: vars.fontRegular,
  fontSize: vars.fontS,
  alignItems: 'center',
};
const loverRequestText = {
  ...directionsText,
  fontSize: 20,
};
const loverRequestTextLarge = {
  ...loverRequestText,
  fontSize: 35,
};

export default StyleSheet.create({
  heartView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'aqua',
  },
  heartImg: {
    width: 260,
    height: 240,
    zIndex: 10,
  },
  directionsText,
  directionsTextUp: {
    ...directionsText,
    marginBottom: getValuesForWidths({ xs: 8, s: 32 }),
  },
  directionsTextDown: {
    ...directionsText,
    marginTop: getValuesForWidths({ xs: 8, s: 32 }),
  },
  loverRequestText,
  loverRequestTextLarge,
});
