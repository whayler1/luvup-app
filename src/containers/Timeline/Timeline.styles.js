import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

export default new StyleSheet.create({
  sectionList: {
    alignSelf: 'stretch',
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
