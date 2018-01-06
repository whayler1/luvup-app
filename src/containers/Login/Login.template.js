import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Login.styles';

export default ({
  navigateToSignUpConfirm,
  navigateToSignUp,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  username,
  password,
  error
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    {error === 'credentials' && <Text style={styles.error}>Invalid username or password</Text>}
    {error === 'server' && <Text style={styles.error}>Server error</Text>}
    <Text style={styles.label}>Username or email</Text>
    <TextInput
      style={styles.input}
      onChangeText={onUsernameChange}
      value={username}
      maxLength={50}
      autoCapitalize={'none'}
    />
    {error === 'username' && <Text style={styles.error}>Please provide a username</Text>}
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      onChangeText={onPasswordChange}
      value={password}
      secureTextEntry={true}
      maxLength={50}
    />
    {error === 'password' && <Text style={styles.error}>Please provide a password</Text>}
    <Button
      raised
      onPress={onSubmit}
      containerViewStyle={styles.submitContainer}
      buttonStyle={styles.submitButton}
      textStyle={styles.submitText}
      title={'Submit'}
    />
    <Button
      raised
      onPress={navigateToSignUp}
      containerViewStyle={styles.submitContainer}
      buttonStyle={styles.submitButton}
      textStyle={styles.submitText}
      title={'Sign Up'}
    />
    <Button
      raised
      onPress={navigateToSignUpConfirm}
      containerViewStyle={styles.submitContainer}
      buttonStyle={styles.submitButton}
      textStyle={styles.submitText}
      title={'Confirm a Sign Up'}
    />
  </View>
);
