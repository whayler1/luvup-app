import { StyleSheet } from 'react-native';

import getValuesForWidths from '../../helpers/getValuesForWidths';
import { vars } from '../../styles';

const styles = StyleSheet.create({
  containerTopArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '100%',
    height: 50,
  },
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
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
  navUiContainerItem: {
    flex: 0.33,
  },
  coinCountBtn: {
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
    alignItems: 'center',
  },
  scoreTitleText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey300,
    fontSize: getValuesForWidths({ xs: 10, s: 12 }),
    textAlign: 'center',
  },
  scoreText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey700,
    fontSize: getValuesForWidths({ xs: 26, s: 30 }),
  },
  menuBtn: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  menuButtonNotificationDot: {
    position: 'relative',
    right: 'auto',
  },
  scoreUpContainer: {
    position: 'absolute',
    top: -50,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scoreUpBubble: {},
});

export default styles;
