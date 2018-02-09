import { StyleSheet } from 'react-native';
import vars from './vars';

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 16,
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: vars.radius,
    borderColor: vars.blueGrey100,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
    shadowColor: vars.blueGrey500,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
  },
  title: {
    fontFamily: vars.fontBlack,
    fontSize: 30,
    textAlign: 'center',
    color: vars.p,
  },
  copy: {
    fontFamily: vars.fontRegular,
    fontSize: 20,
    marginTop: 16,
    color: vars.p,
  },
  buttonContainer: {
    marginTop: 32,
    alignSelf: 'stretch',
  },
});
