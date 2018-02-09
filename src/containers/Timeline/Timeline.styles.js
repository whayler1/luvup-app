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
  leaderboardSlot: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
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
    borderBottomColor: vars.blueGrey100,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  sectionHeaderText: {
    color: vars.blueGrey500,
    fontSize: 20,
    fontFamily: vars.fontRegular,
  },
  renderItemContainer: {
    padding:16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: vars.blueGrey50,
    borderBottomWidth: 1,
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
    fontFamily: vars.fontRegular
  },
});
