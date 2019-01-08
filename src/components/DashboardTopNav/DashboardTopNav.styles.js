import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    marginTop: 28,
    zIndex: 10,
  },
  pushdownText: {
    color: 'white',
    fontFamily: vars.fontRegular,
    fontSize: 18,
  },
  navUiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  coinCountBtn: {
    flex: 0.33,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinCountText: {
    paddingLeft: 5,
    fontFamily: vars.fontBlack,
    fontSize: 16,
    color: vars.blueGrey500,
  },
  scoreBtn: {
    flex: 0.33,
    alignItems: 'center',
  },
  scoreTitleText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey300,
    fontSize: 12,
  },
  scoreText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey700,
    fontSize: 30,
  },
  menuBtn: {
    flex: 0.33,
    alignItems: 'flex-end',
  },
  menuText: {
    fontFamily: vars.fontBlack,
    fontSize: 16,
    color: vars.blueGrey500,
  },
  notificationDot: {
    left: -2,
    top: -3,
  },
});

export default styles;
