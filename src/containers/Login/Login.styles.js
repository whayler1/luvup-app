import { StyleSheet } from 'react-native';

import { vars } from '../../styles';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  label: {
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
  submitText: {
    textAlign: 'center',
  },
  submitContainer: {
    flex: 1,
  },
  wellError: { marginTop: 32, marginBottom: 0 },
  noAccountTextContainer: {
    marginTop: 32,
  },
  noAccountButtonRow: { marginTop: 16 },
  confirmCodeWrapper: {
    paddingTop: vars.gutter,
  },
  signUpWrapper: {
    paddingTop: vars.gutter,
  },
  forgotPasswordButton: {
    marginTop: 12,
  },
  forgotPasswordText: {
    textAlign: 'right',
  },
});

export default styles;
