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

import styles from './ConfirmUserRequestCreateProfile.styles';
import { forms, buttons, modal, scene, vars } from '../../styles';
import Well from '../../components/Well';

export default ({
  onUsernameChange,
  onFirstNameChange,
  onLastNameChange,
  onPasswordChange,
  onPasswordAgainChange,
  onSubmit,
  username,
  firstName,
  lastName,
  password,
  passwordAgain,
  error,
  isInFlight,
}) => {
  let firstNameEl;
  const focusFirstName = () => firstNameEl.focus();
  let lastNameEl;
  const focusLastNameEl = () => lastNameEl.focus();
  let passwordEl;
  const focusPasswordEl = () => passwordEl.focus();
  let passwordAgainEl;
  const focusPasswordAgainEl = () => passwordAgainEl.focus();

  return (
    <KeyboardAvoidingView
      contentContainerStyle={scene.keyboardAvoidingView}
      style={scene.container}
      keyboardVerticalOffset={32}
      behavior="padding"
    >
      <ScrollView style={scene.content}>
        <Text style={modal.title}>Create Your Profile</Text>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Username</Text>
          <TextInput
            style={forms.input}
            onChangeText={onUsernameChange}
            value={username}
            maxLength={50}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Min 8 chars. No spaces."
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusFirstName}
          />
          {error === 'username' && <Text style={forms.error}>Please provide a username</Text>}
          {error === 'username-length' && <Text style={forms.error}>Usernames must be at least 3 characters</Text>}
          {error === 'username taken' && <Text style={forms.error}>Username taken</Text>}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>First Name</Text>
          <TextInput
            ref={el => firstNameEl = el}
            style={forms.input}
            onChangeText={onFirstNameChange}
            value={firstName}
            maxLength={50}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Jane"
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusLastNameEl}
          />
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Last Name</Text>
          <TextInput
            ref={el => lastNameEl = el}
            style={forms.input}
            onChangeText={onLastNameChange}
            value={lastName}
            maxLength={50}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Doe"
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusPasswordEl}
          />
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Password</Text>
          <TextInput
            ref={el => passwordEl = el}
            style={forms.input}
            onChangeText={onPasswordChange}
            value={password}
            secureTextEntry={true}
            maxLength={50}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Min 8 Chars. No spaces"
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusPasswordAgainEl}
          />
          {error === 'password' && <Text style={forms.error}>Please provide a password</Text>}
          {error === 'password-length' && <Text style={forms.error}>Passwords must be at least 8 characters</Text>}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Re-Enter Password</Text>
          <TextInput
            ref={el => passwordAgainEl = el}
            style={forms.input}
            onChangeText={onPasswordAgainChange}
            value={passwordAgain}
            secureTextEntry={true}
            maxLength={50}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Must match password"
            placeholderTextColor={vars.placeholder}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {error === 'password-mismatch' && <Text style={forms.error}>Passwords do not match</Text>}
        </View>
        {error === 'response' && <Well text="There was an error confirming signup"/>}
        {error === 'user request used' && <Well text="This user already exists"/>}
        <View style={forms.buttonRow}>
          <View style={{
            flex: 1,
          }}>
            <Button
              raised
              onPress={onSubmit}
              containerViewStyle={buttons.infoContainer}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              disabled={isInFlight}
              title={isInFlight ? 'Submitting' : 'Submit'}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
