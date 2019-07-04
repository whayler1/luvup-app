import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  loverSearchContainer: {
    marginTop: 0,
  },
  renderItem: {
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomColor: vars.blueGrey100,
    borderBottomWidth: 0.5,
  },
  renderItemName: {
    fontSize: 20,
    fontFamily: vars.fontRegular,
    color: vars.link,
  },
  renderItemUsername: {
    fontSize: 16,
    fontFamily: vars.fontRegular,
    color: vars.blueGrey500,
  },
  flatList: {
    paddingTop: 16,
  },
  renderItemIcon: {
    position: 'absolute',
    top: 18,
    right: 0,
  },
  directionsContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
