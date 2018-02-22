import React from 'react';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './SignUp.styles';
import { buttons, forms, modal, scene, wells, vars } from '../../styles';

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
    behavior="padding"
  >
    <View style={scene.content}>
      <Text style={modal.title}>Sign Up</Text>
      <View style={forms.formGroup}>
        <Text style={forms.label}>Email</Text>
        <TextInput
          style={focusInput === 'email' ? forms.inputFocus : forms.input}
          onFocus={onEmailFocus}
          onBlur={onBlur}
          onChangeText={onEmailChange}
          value={email}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          maxLength={50}
          editable={!isInFlight}
          spellCheck={false}
          placeholder="jane.doe@email.com"
          placeholderTextColor={vars.placeholder}
          returnKeyType="go"
          onSubmitEditing={onSubmit}
        />
        {error === 'email' && <Text style={forms.error}>Please provide a valid email</Text>}
      </View>
      {error === 'response' &&
        <View style={[wells.error, { marginTop: 32, marginBottom: 0 }]}>
          <Text style={wells.errorText}>Server error</Text>
        </View>
      }
      {error === 'email error' &&
        <View style={[wells.error, { marginTop: 32, marginBottom: 0 }]}>
          <Text style={wells.errorText}>Error sending signup email</Text>
        </View>
      }
      {error === 'used' &&
        <View style={[wells.error, { marginTop: 32, marginBottom: 0 }]}>
          <Text style={wells.errorText}>There is already a user with this email</Text>
        </View>
      }
      <View style={forms.buttonRow}>
        <View style={{
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
    </View>
  </KeyboardAvoidingView>
);
