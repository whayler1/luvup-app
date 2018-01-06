import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './SignUpConfirm.styles';
import { forms, buttons } from '../../styles';

export default ({
  onEmailChange,
  onUsernameChange,
  onCodeChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  email,
  username,
  code,
  password,
  passwordAgain,
  error,
  isInFlight,
}) => (
  <View style={styles.container}>
    <Text style={forms.title}>Confirm Sign Up</Text>
    <Text style={forms.label}>Email</Text>
    <TextInput
      style={forms.input}
      onChangeText={onEmailChange}
      value={email}
      maxLength={100}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      editable={!isInFlight}
    />
    {error === 'email' && <Text style={forms.error}>Please provide a valid email</Text>}
    <Text style={forms.label}>Username</Text>
    <TextInput
      style={forms.input}
      onChangeText={onUsernameChange}
      value={username}
      maxLength={50}
      autoCapitalize={'none'}
      editable={!isInFlight}
    />
    {error === 'username' && <Text style={forms.error}>Please provide a username</Text>}
    {error === 'username-length' && <Text style={forms.error}>Usernames must be at least 3 characters</Text>}
    <Text style={forms.label}>Code</Text>
    <TextInput
      style={forms.input}
      onChangeText={onCodeChange}
      value={code}
      maxLength={6}
      keyboardType={'numeric'}
      autoCapitalize={'none'}
      editable={!isInFlight}
    />
    {error === 'code' && <Text style={forms.error}>Please provide the code that was emailed to you</Text>}
    {error === 'code-length' && <Text style={forms.error}>Codes are 6 characters long</Text>}
    <Text style={forms.label}>Password</Text>
    <TextInput
      style={forms.input}
      onChangeText={onPasswordChange}
      value={password}
      secureTextEntry={true}
      maxLength={50}
      editable={!isInFlight}
    />
    {error === 'password' && <Text style={forms.error}>Please provide a password</Text>}
    {error === 'password-length' && <Text style={forms.error}>Passwords must be at least 8 characters</Text>}
    <Text style={forms.label}>Re-Enter Password</Text>
    <TextInput
      style={forms.input}
      onChangeText={onPasswordAgainChange}
      value={passwordAgain}
      secureTextEntry={true}
      maxLength={50}
      editable={!isInFlight}
    />
    {error === 'password-mismatch' && <Text style={forms.error}>Passwords do not match</Text>}
    <Button
      raised
      onPress={onSubmit}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      disabled={isInFlight}
      title={isInFlight ? 'Submitting' : 'Submit'}
    />
  </View>
);
