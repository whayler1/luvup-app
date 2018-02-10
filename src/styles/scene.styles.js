import { StyleSheet } from 'react-native';

import vars from './vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNav: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    marginTop: 28,
    zIndex: 10,
  },
  topNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 0,
  },
  content: {
    marginTop: 50,
    alignSelf: 'stretch',
    padding: 8,
    // backgroundColor: 'rgba(0,200,50,0.3)'
  },
});
