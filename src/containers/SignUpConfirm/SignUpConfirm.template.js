import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './SignUpConfirm.styles';
import defaultStyles from '../../styles';

const { forms, buttons } = defaultStyles;

export default ({
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  email,
  username,
  password,
  passwordAgain,
  error,
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
    />
    <Text style={forms.label}>Username</Text>
    <TextInput
      style={forms.input}
      onChangeText={onUsernameChange}
      value={username}
      maxLength={50}
      autoCapitalize={'none'}
    />
    <Text style={forms.label}>Password</Text>
    <TextInput
      style={forms.input}
      onChangeText={onPasswordChange}
      value={password}
      secureTextEntry={true}
      maxLength={50}
    />
    <Text style={forms.label}>Re-Enter Password</Text>
    <TextInput
      style={forms.input}
      onChangeText={onPasswordAgainChange}
      value={passwordAgain}
      secureTextEntry={true}
      maxLength={50}
    />
    <Button
      raised
      onPress={onSubmit}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      title={'Submit'}
    />
  </View>
);
