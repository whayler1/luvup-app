import { StyleSheet } from 'react-native';
import vars from './vars';

const container = {
  alignSelf: 'stretch',
  marginLeft: 0,
  marginRight: 0,
};
const infoContainer = {...container};
const text = {
  textAlign: 'center',
  fontFamily: vars.fontBlack,
};
const infoText = {...text};
const dangerSkeletonText = {
  ...text,
  color: vars.dangerButtonBg,
}

export default StyleSheet.create({
  container,
  infoContainer,
  infoButton: {
    backgroundColor: vars.infoButtonBg,
    borderRadius: vars.radius,
  },
  dangerButton: {
    backgroundColor: vars.dangerButtonBg,
    borderRadius: vars.radius,
  },
  dangerSkeletonButton: {
    backgroundColor: 'white',
    borderColor: vars.dangerButtonBg,
    borderWidth: 1,
    borderRadius: vars.radius,
  },
  dangerSkeletonText,
  text,
  infoText,
});
