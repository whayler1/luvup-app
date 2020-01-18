import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenWidth = Math.round(windowDimensions.width);
const mediumPhoneWidth = 320;

const getValuesForWidths = ({ xs, s }) =>
  screenWidth < mediumPhoneWidth ? xs : s;

export default getValuesForWidths;
