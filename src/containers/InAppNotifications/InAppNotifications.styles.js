import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    backgroundColor: vars.blue500,
    position: 'absolute',
    left: 8,
    right: 8,
    top: 96,
    zIndex: 500,
    padding: 16,
    shadowColor: vars.blueGrey700,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    flexDirection: 'row',
  },
  textWrap: {
    flex: 1,
    alignSelf: 'stretch',
    paddingRight: 16,
  },
  text: {
    fontFamily: vars.fontBlack,
    fontSize: 16,
    color: 'white',
  },
  closeBtn: {
    flex: 0,
  },
});
