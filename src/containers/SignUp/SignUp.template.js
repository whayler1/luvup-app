import React from 'react';
import { Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={true}
  >
    <Text style={forms.title}>Sign Up</Text>
    {error === 'response' && <Text style={forms.error}>Server Error</Text>}
    {error === 'email error' && <Text style={forms.error}>Error sending signup email</Text>}
    {error === 'used' && <Text style={forms.error}>There is already a user with this email</Text>}
    <Text style={forms.label}>Email</Text>
    <TextInput
      style={forms.input}
      onChangeText={onEmailChange}
      value={email}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      maxLength={50}
      editable={!isInFlight}
      spellCheck={false}
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
  </KeyboardAwareScrollView>
);
