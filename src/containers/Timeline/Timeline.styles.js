import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

export default new StyleSheet.create({
  sectionList: {
    alignSelf: 'stretch',
  },
  listHeaderContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  listFooterContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingTop: 16,
  },
  leaderboardSlot: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardText: {
    marginLeft: 8,
    fontFamily: vars.fontBlack,
    fontSize: 20,
    color: vars.blueGrey500,
  },
  sectionHeaderContainer: {
    padding: 16,
    borderBottomColor: vars.blueGrey50,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  sectionHeaderText: {
    color: vars.blueGrey800,
    fontSize: 20,
    fontFamily: vars.fontRegular,
  },
  renderItemContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemContentText: {
    color: vars.blueGrey500,
    fontSize: 20,
    paddingLeft: 8,
    fontFamily: vars.fontRegular,
  },
  renderItemContentSmall: {
    color: vars.blueGrey500,
    fontSize: 14,
    fontFamily: vars.fontRegular,
  },
});
