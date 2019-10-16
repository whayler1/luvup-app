import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  topNav: {
    paddingTop: vars.gutterHalf,
    zIndex: 20,
  },
  group: {
    marginTop: 32,
  },
  title: {
    color: vars.blueGrey800,
    fontSize: 27,
    fontFamily: vars.fontBlack,
  },
  label: {
    fontFamily: vars.fontBlack,
    fontSize: 12,
    color: vars.blueGrey500,
    marginTop: 16,
  },
  value: {
    fontSize: 20,
    color: vars.blueGrey500,
    marginTop: 4,
    fontFamily: vars.fontRegular,
  },
  valueSmall: {
    fontSize: 16,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  scrollViewContentContainer: {
    paddingVertical: vars.gutter,
    paddingHorizontal: vars.gutter,
    justifyContent: 'center',
  },
  menuLinkContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  menuLinkText: {
    fontFamily: vars.fontRegular,
    color: vars.link,
    fontSize: 20,
  },
  menuLinkTextDanger: {
    color: vars.danger,
  },
  loverRequestItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loverRequestItemContent: {},
  loverRequestItemIcon: {
    alignSelf: 'center',
    marginLeft: 16,
  },
  loverRequestItemIconNotificationDot: {
    position: 'relative',
    right: 'auto',
    top: 'auto',
  },
  loverRequestItemTitle: {
    fontFamily: vars.fontRegular,
    color: vars.link,
    fontSize: 20,
  },
  loverRequestItemInfo: {
    fontFamily: vars.fontRegular,
    color: vars.blueGrey500,
    fontSize: 16,
  },
  loverRequestItemSub: {
    marginTop: 0,
    marginBottom: 8,
  },
});
