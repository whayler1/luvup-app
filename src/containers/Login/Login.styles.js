import { StyleSheet } from 'react-native';

const elWidth = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
  input: {
    height: 40,
    width: elWidth,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: 'lightblue',
    borderRadius: 2,
    marginTop: 30,
  },
  submitText: {
    textAlign: 'center',
  },
  submitContainer: {
    width: elWidth,
  },
});

export default styles;
