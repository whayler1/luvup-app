import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  heartView: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: 300,
    height: 275,
    zIndex: 10,
  },
  wrapperInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 32,
    alignItems: 'center',
  },
  wellWrapper: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  buttonCell2ColLeft: { paddingLeft: 16 },
  buttonCall2ColRight: { paddingRight: 16 },
});
