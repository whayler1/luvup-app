import { StyleSheet } from 'react-native';

const radius = 2;
const elWidth = 200;

export default StyleSheet.create({
  input: {
    height: 40,
    width: elWidth,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: radius,
    marginTop: 10
  },
  title: {
    fontSize: 30,
  },
  label: {
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});
