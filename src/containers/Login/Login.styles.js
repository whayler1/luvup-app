import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
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
  input: {height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10},
});

export default styles;
