import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './SignUp.styles';
import { buttons, forms } from '../../styles';

// const { buttons, forms } = defaultStyles;

export default ({
  onSubmit,
  onEmailChange,
  email,
  error,
  isInFlight,
}) => (
  <View style={styles.container}>
    <Text style={forms.title}>Sign Up</Text>
    <Text style={forms.label}>Email</Text>
    <TextInput
      style={forms.input}
      onChangeText={onEmailChange}
      value={email}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      maxLength={50}
      editable={!isInFlight}
    />
    {error === 'email' && <Text style={forms.error}>Please provide a valid email</Text>}
    <Button
      raised
      onPress={onSubmit}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      title={isInFlight ? 'Submitting' : 'Submit'}
      disabled={isInFlight}
    />
  </View>
);
