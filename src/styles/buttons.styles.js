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
  fontSize: 16,
};
const infoText = { ...text, color: 'white' };
const dangerSkeletonText = {
  ...text,
  color: vars.dangerButtonBg,
};

const buttonContainer = {
  paddingVertical: 10,
  paddingHorizontal: vars.gutter,
};

const secondarySkeletonButton = {
  ...buttonContainer,
  backgroundColor: 'transparent',
  borderColor: vars.blueGrey100,
  borderWidth: 1,
  borderRadius: vars.radius,
  height: 46,
};
const secondarySkeletonText = {
  ...text,
  color: vars.blueGrey500,
};

export default StyleSheet.create({
  container,
  infoContainer,
  infoButton: {
    ...buttonContainer,
    backgroundColor: vars.infoButtonBg,
    borderRadius: vars.radius,
  },
  infoSkeletonButton: {
    ...buttonContainer,
    backgroundColor: 'transparent',
    borderRadius: vars.radius,
    borderColor: vars.infoButtonBg,
    borderWidth: 1,
    height: 46,
  },
  infoSkeletonText: {
    ...text,
    color: vars.cyan500,
  },
  dangerButton: {
    ...buttonContainer,
    backgroundColor: vars.dangerButtonBg,
    borderRadius: vars.radius,
  },
  dangerText: {
    ...text,
    color: 'white',
  },
  dangerSkeletonButton: {
    ...buttonContainer,
    backgroundColor: 'white',
    borderColor: vars.dangerButtonBg,
    borderWidth: 1,
    borderRadius: vars.radius,
    height: 46,
  },
  dangerSkeletonText,
  secondarySkeletonButton,
  secondarySkeletonText,
  text,
  infoText,
  inFlightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
