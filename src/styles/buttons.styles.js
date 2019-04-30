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
  infoButtonPress: {
    backgroundColor: vars.linkPress,
  },
  infoButtonDisabled: {
    backgroundColor: vars.linkDisabled,
  },
  infoSkeletonButton: {
    ...buttonContainer,
    backgroundColor: 'transparent',
    borderRadius: vars.radius,
    borderColor: vars.infoButtonBg,
    borderWidth: 1,
    height: 46,
  },
  infoSkeletonButtonPress: {
    borderColor: vars.linkPress,
  },
  infoSkeletonButtonDisabled: {
    borderColor: vars.linkDisabled,
    backgroundColor: vars.blueGrey50,
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
  dangerButtonPress: {
    backgroundColor: vars.dangerPress,
  },
  dangerButtonDisabled: {
    backgroundColor: vars.dangerDisabled,
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
  dangerSkeletonButtonPress: {
    borderColor: vars.dangerPress,
  },
  dangerSkeletonButtonDisabled: {
    borderColor: vars.dangerDisabled,
    backgroundColor: vars.blueGrey50,
  },
  dangerSkeletonText,
  secondarySkeletonButton,
  secondarySkeletonButtonPress: {
    borderColor: vars.blueGrey300,
  },
  secondarySkeletonButtonDisabled: {
    borderColor: vars.blueGrey300,
    backgroundColor: vars.blueGrey50,
  },
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
