import React from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import styles from './ConfirmUserRequestCode.styles';
import { forms, buttons, modal, scene, vars } from '../../styles';
import Well from '../../components/Well';

export default ({
  onEmailFocus,
  onCodeFocus,
  onEmailChange,
  onCodeChange,
  onBlur,
  onSubmit,
  email,
  code,
  error,
  focusInput,
  isInFlight,
}) => {
  let codeEl;
  const focusCode = () => codeEl.focus();

  return (
    <KeyboardAvoidingView
      contentContainerStyle={scene.keyboardAvoidingView}
      style={scene.container}
      keyboardVerticalOffset={32}
      behavior="padding">
      <ScrollView style={scene.content}>
        <Text style={modal.title}>Confirm Sign Up Code</Text>
        <Text style={[modal.copy, { textAlign: 'center' }]}>
          Enter your email address and the code you received via email below.
        </Text>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Email</Text>
          <TextInput
            style={focusInput === 'email' ? forms.inputFocus : forms.input}
            onFocus={onEmailFocus}
            onBlur={onBlur}
            onChangeText={onEmailChange}
            value={email}
            maxLength={100}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="jane.doe@email.com"
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusCode}
          />
          {error === 'email' && (
            <Text style={forms.error}>Please provide a valid email</Text>
          )}
          {error === 'no user request' && (
            <Text style={forms.error}>
              There is no sign up request for that email
            </Text>
          )}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Code</Text>
          <TextInput
            ref={el => (codeEl = el)}
            style={focusInput === 'code' ? forms.inputFocus : forms.input}
            onFocus={onCodeFocus}
            onBlur={onBlur}
            onChangeText={onCodeChange}
            value={code}
            maxLength={6}
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="This was emailed to you"
            placeholderTextColor={vars.placeholder}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {error === 'code' && (
            <Text style={forms.error}>
              Please provide the code that was emailed to you
            </Text>
          )}
          {error === 'code-length' && (
            <Text style={forms.error}>Codes are 6 characters long</Text>
          )}
          {error === 'invalid code' && (
            <Text style={forms.error}>Invalid Code</Text>
          )}
          {error === 'expired code' && (
            <Text style={forms.error}>Expired Code</Text>
          )}
        </View>
        {error === 'response' && (
          <Well text="There was an error confirming your signup code" />
        )}
        {error === 'user request used' && (
          <Well text="This user already exists" />
        )}
        <View style={forms.buttonRow}>
          <View
            style={{
              flex: 1,
            }}>
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
};
