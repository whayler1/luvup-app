import { StyleSheet } from 'react-native';
import vars from './vars';

const container = {
  alignSelf: 'stretch',
  marginLeft: 0,
  marginRight: 0,
};
const infoContainer = { ...container };
const text = {
  textAlign: 'center',
  fontFamily: vars.fontBlack,
};
const infoText = { ...text };
const dangerSkeletonText = {
  ...text,
  color: vars.dangerButtonBg,
};

const secondarySkeletonButton = {
  backgroundColor: 'transparent',
  borderColor: vars.blueGrey100,
  borderWidth: 1,
  borderRadius: vars.radius,
};
const secondarySkeletonText = {
  ...text,
  color: vars.blueGrey500,
};

export default StyleSheet.create({
  container,
  infoContainer,
  infoButton: {
    backgroundColor: vars.infoButtonBg,
    borderRadius: vars.radius,
  },
  infoSkeletonButton: {
    backgroundColor: 'transparent',
    borderRadius: vars.radius,
    borderColor: vars.infoButtonBg,
    borderWidth: 1,
  },
  infoSkeletonText: {
    ...text,
    color: vars.cyan500,
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
  secondarySkeletonButton,
  secondarySkeletonText,
  text,
  infoText,
});
