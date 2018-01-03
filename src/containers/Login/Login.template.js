import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './Login.styles';

export default ({ onSubmit, onUsernameChange, onPasswordChange, username, password }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <Text style={styles.label}>User Name</Text>
    <TextInput
      style={styles.input}
      onChangeText={onUsernameChange}
      value={username}
      maxLength={50}
      autoCapitalize={'none'}
    />
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      onChangeText={onPasswordChange}
      value={password}
      secureTextEntry={true}
      maxLength={50}
    />
    <Button
      onPress={onSubmit}
      title="Submit"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);
