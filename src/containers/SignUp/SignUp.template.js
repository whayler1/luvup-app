import React from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';

import { buttons, forms, modal, scene, wells, vars } from '../../styles';
import styles from './SignUp.styles';

export default ({
  onSubmit,
  onEmailFocus,
  onEmailChange,
  onBlur,
  email,
  error,
  isInFlight,
  focusInput,
}) => (
  <KeyboardAvoidingView
    contentContainerStyle={scene.keyboardAvoidingView}
    style={scene.container}
    keyboardVerticalOffset={32}
    behavior="padding">
    <ScrollView style={scene.content}>
      <Text style={modal.title}>Sign Up</Text>
      <View style={forms.formGroup}>
        <Text style={forms.label}>Email</Text>
        <TextInput
          testID="signup-email-input"
          style={focusInput === 'email' ? forms.inputFocus : forms.input}
          onFocus={onEmailFocus}
          onBlur={onBlur}
          onChangeText={onEmailChange}
          value={email}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          maxLength={100}
          editable={!isInFlight}
          spellCheck={false}
          placeholder="jane.doe@email.com"
          placeholderTextColor={vars.placeholder}
          returnKeyType="go"
          onSubmitEditing={onSubmit}
        />
        {error === 'email' && (
          <Text style={forms.error}>Please provide a valid email</Text>
        )}
      </View>
      {error.length > 0 && error !== 'email' && (
        <View style={[wells.error, styles.errorWellWrapper]}>
          <Text style={wells.errorText}>{error}</Text>
        </View>
      )}
      <View style={forms.buttonRow}>
        <View style={styles.submitWrap}>
          <Button
            onPress={onSubmit}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={isInFlight ? 'Submitting…' : 'Submit'}
            disabled={isInFlight}
          />
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
