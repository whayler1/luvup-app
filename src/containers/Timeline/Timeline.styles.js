import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

const renderItemContainer = {
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 8,
  alignSelf: 'stretch',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
};
const renderItemContainerLast = { ...renderItemContainer, paddingBottom: 24 };
const leaderboardSlot = {
  paddingLeft: 16,
  paddingRight: 16,
  flexDirection: 'row',
  alignItems: 'center',
};
const leaderboardSlotSecond = { ...leaderboardSlot, paddingTop: 16 };

export default new StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: vars.razzleDazzleRose,
  },
  sectionList: {
    alignSelf: 'stretch',
  },
  listHeaderContainer: {
    paddingBottom: 24,
    backgroundColor: vars.razzleDazzleRose,
  },
  listFooterContainer: {
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  leaderboardSlot,
  leaderboardSlotSecond,
  leaderboardText: {
    marginLeft: 4,
    fontFamily: vars.fontBlack,
    fontSize: 13,
    color: 'white',
  },
  sectionHeaderContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomColor: vars.blueGrey100,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  sectionHeaderText: {
    color: vars.blueGrey800,
    fontSize: 20,
    fontFamily: vars.fontBlack,
  },
  renderItemWrapper: {
    backgroundColor: 'white',
  },
  renderItemContainer,
  renderItemContainerLast,
  renderItemContent: {
    flexDirection: 'row',
    flex: 1,
  },
  renderItemContentText: {
    color: vars.blueGrey700,
    fontSize: 20,
    fontFamily: vars.fontRegular,
    flex: 1,
  },
  renderItemContentSmall: {
    color: vars.blueGrey500,
    fontSize: 14,
    fontFamily: vars.fontRegular,
    paddingTop: 4,
  },
  renderItemLoveNoteText: {
    color: vars.blueGrey300,
    fontSize: 14,
    fontFamily: vars.fontBlack,
    paddingTop: 4,
  },
  renderItemLoveNoteTokenRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  renderItemLoveNoteTokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemLoveNoteTokenText: {
    fontFamily: vars.fontBlack,
    fontSize: 14,
    color: vars.blueGrey500,
    paddingLeft: 2,
  },
  renderItemNotificationDot: {
    position: 'absolute',
    left: 12,
    top: 10,
  },
  renderItemIconContainer: {
    minWidth: 50,
  },
  renderItemCopyContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  renderItemCoinSentImage: {
    width: 32,
    height: 25,
  },
  renderItemCoinReceivedImage: {
    width: 31,
    height: 25,
  },
  renderItemJalapenoSentImage: {
    width: 24,
    height: 25,
  },
  renderItemJalapenoReceivedImage: {
    width: 26,
    height: 25,
  },
  renderItemLoveNoteWrapper: { paddingTop: 3 },
  renderItemQuizIconWrapper: { paddingTop: 3 },
  heartBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  heartImg: {
    width: 32,
    height: 30,
  },
  sectionListWrapper: {
    paddingTop: 83,
    alignSelf: 'stretch',
  },
  topNav: {
    backgroundColor: vars.razzleDazzleRose,
    marginTop: 0,
    paddingTop: 45,
  },
  listItemEmptyWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  listItemEmptyText: { fontSize: 25, textAlign: 'center' },
});
