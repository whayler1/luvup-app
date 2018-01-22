import React from 'react';
import { Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import styles from './SignUpConfirm.styles';
import { forms, buttons } from '../../styles';

export default ({
  onEmailChange,
  onUsernameChange,
  onFirstNameChange,
  onLastNameChange,
  onCodeChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  email,
  username,
  firstName,
  lastName,
  code,
  password,
  passwordAgain,
  error,
  isInFlight,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={true}
  >
    <Text style={forms.title}>Confirm Sign Up</Text>
    {error === 'response' && <Text style={forms.error}>There was an error confirming signup</Text>}
    {error === 'user request used' && <Text style={forms.error}>This user already exists</Text>}
    <Text style={forms.label}>Email</Text>
    <TextInput
      style={forms.input}
      onChangeText={onEmailChange}
      value={email}
      maxLength={100}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      editable={!isInFlight}
      spellCheck={false}
    />
    {error === 'email' && <Text style={forms.error}>Please provide a valid email</Text>}
    {error === 'no user request' && <Text style={forms.error}>There is no sign up request for that email</Text>}
    <Text style={forms.label}>Username</Text>
    <TextInput
      style={forms.input}
      onChangeText={onUsernameChange}
      value={username}
      maxLength={50}
      autoCapitalize={'none'}
      editable={!isInFlight}
      spellCheck={false}
    />
    {error === 'username' && <Text style={forms.error}>Please provide a username</Text>}
    {error === 'username-length' && <Text style={forms.error}>Usernames must be at least 3 characters</Text>}
    {error === 'username taken' && <Text style={forms.error}>Username taken</Text>}
    <Text style={forms.label}>First Name</Text>
    <TextInput
      style={forms.input}
      onChangeText={onFirstNameChange}
      value={firstName}
      maxLength={50}
      autoCapitalize={'none'}
      editable={!isInFlight}
      spellCheck={false}
    />
    <Text style={forms.label}>Last Name</Text>
    <TextInput
      style={forms.input}
      onChangeText={onLastNameChange}
      value={lastName}
      maxLength={50}
      autoCapitalize={'none'}
      editable={!isInFlight}
      spellCheck={false}
    />
    <Text style={forms.label}>Code</Text>
    <TextInput
      style={forms.input}
      onChangeText={onCodeChange}
      value={code}
      maxLength={6}
      keyboardType={'numeric'}
      autoCapitalize={'none'}
      editable={!isInFlight}
      spellCheck={false}
    />
    {error === 'code' && <Text style={forms.error}>Please provide the code that was emailed to you</Text>}
    {error === 'code-length' && <Text style={forms.error}>Codes are 6 characters long</Text>}
    {error === 'invalid code' && <Text style={forms.error}>Invalid Code</Text>}
    {error === 'expired code' && <Text style={forms.error}>Expired Code</Text>}
    <Text style={forms.label}>Password</Text>
    <TextInput
      style={forms.input}
      onChangeText={onPasswordChange}
      value={password}
      secureTextEntry={true}
      maxLength={50}
      editable={!isInFlight}
      spellCheck={false}
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
      spellCheck={false}
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
  </KeyboardAwareScrollView>
);
