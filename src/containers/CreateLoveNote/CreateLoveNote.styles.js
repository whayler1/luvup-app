import { StyleSheet } from 'react-native';
import { vars } from '../../styles';

export default StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    backgroundColor: 'white',
    position: 'absolute',
    left: 8,
    right: 8,
    top: 36,
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
});
