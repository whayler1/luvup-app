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
};
const renderItemContainerLast = {
  ...renderItemContainer,
  paddingBottom: 24,
};
const leaderboardSlot = {
  paddingLeft: 16,
  paddingRight: 16,
  flexDirection: 'row',
  alignItems: 'center',
};
const leaderboardSlotSecond = {
  ...leaderboardSlot,
  paddingTop: 16,
};

export default new StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
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
  },
  leaderboardSlot,
  leaderboardSlotSecond,
  leaderboardText: {
    marginLeft: 8,
    fontFamily: vars.fontBlack,
    fontSize: 20,
    color: vars.blueGrey500,
  },
  sectionHeaderContainer: {
    paddingTop: 0,
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
});
