import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './SignUp.styles';
import defaultStyles from '../../styles';

const { buttons, forms } = defaultStyles;

export default ({
  onSubmit,
  onEmailChange,
  email,
  error,
}) => (
  <View style={styles.container}>
    <Text style={forms.title}>Sign Up</Text>
    <Text style={forms.label}>Email</Text>
    <TextInput
      style={forms.input}
      onChangeText={onEmailChange}
      value={email}
      keyboardType={'email-address'}
      maxLength={50}
    />
    {error === 'email' && <Text style={forms.error}>Please provide a valid email</Text>}
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
