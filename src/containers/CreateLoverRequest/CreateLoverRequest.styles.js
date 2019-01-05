import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

const container = {
  flex: 1,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  // alignItems: 'flex-start',
};

export default StyleSheet.create({
  container,
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
  menuButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButtonText: {
    fontFamily: vars.fontBlack,
    fontSize: 16,
    color: vars.blueGrey500,
  },
  flatList: {
    paddingTop: 16,
  },
  rnderItemIcon: {
    position: 'absolute',
    top: 18,
    right: 0,
  },
});
