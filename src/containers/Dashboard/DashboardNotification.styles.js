import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: vars.blueGrey100,
    alignSelf: 'stretch',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    backgroundColor: 'white',
    // maxHeight: 5000,
  },
  content: {
    padding: vars.gutterAndHalf,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginHorizontal: -1,
    marginBottom: -1,
  },
  button: {
    flex: 1,
    paddingVertical: vars.gutterHalf,
    borderColor: vars.blueGrey100,
    borderWidth: 1,
  },
  buttonFocus: {
    zIndex: 10,
    borderColor: vars.link,
  },
  buttonFirst: {
    borderBottomLeftRadius: 3,
  },
  buttonLast: {
    borderBottomRightRadius: 3,
  },
  buttonAdditional: {
    marginLeft: -1,
  },
  buttonText: {
    fontFamily: vars.fontBlack,
    color: vars.blueGrey500,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: vars.link,
  },
});
