import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { modal, buttons, forms, vars } from '../../styles';

const getCloseButton = ({ isInFlight, closeModal }) => (
  <Button
    onPress={closeModal}
    containerViewStyle={buttons.infoContainer}
    buttonStyle={buttons.secondarySkeletonButton}
    textStyle={buttons.secondarySkeletonText}
    title={'Close'}
    disabled={isInFlight}
  />
);

export default ({
  currentPassword,
  newPassword,
  newPasswordAgain,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onNewPasswordAgainChange,
  onCurrentPasswordFocus,
  onNewPasswordFocus,
  onNewPasswordAgainFocus,
  onBlur,
  onSubmit,
  closeModal,
  focusInput,
  isInFlight,
  success,
  error,
}) => {
  let newPasswordInput;
  let newPasswordAgainInput;
  const focusNewPassword = () => newPasswordInput.focus();
  const focusNewPasswordAgain = () => newPasswordAgainInput.focus();

  return (
    <View
      style={{
        alignSelf: 'stretch',
        alignItems: 'center',
      }}>
      {success && (
        <Icon
          name="ios-checkmark-circle-outline"
          size={60}
          color={vars.success}
        />
      )}
      {!success && <Icon name="md-unlock" size={60} color={vars.p} />}
      <Text style={modal.title}>Change Password</Text>
      {error === 'server-error' && (
        <Text style={forms.error}>
          {'There was an error submitting your request. This is most likely a connectivity issue.' +
            '\nIf the problem persists please contact justin@luvup.io'}
        </Text>
      )}
      {success && [
        <Text key={1} style={modal.copy}>
          Your Password has been changed successully!
        </Text>,
        <View key={2} style={forms.buttonRow}>
          <View
            style={{
              flex: 1,
            }}>
            {getCloseButton({ isInFlight, closeModal })}
          </View>
        </View>,
      ]}
      {!success && [
        <View key={3} style={forms.formGroup}>
          <Text style={forms.label}>Current Password</Text>
          <TextInput
            style={[
              forms.input,
              focusInput === 'currentPassword' && forms.inputFocus,
            ]}
            onChangeText={onCurrentPasswordChange}
            onFocus={onCurrentPasswordFocus}
            onBlur={onBlur}
            value={currentPassword}
            secureTextEntry={true}
            maxLength={50}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Min 8 chars. No spaces"
            placeholderTextColor={vars.blueGrey100}
            returnKeyType="next"
            onSubmitEditing={focusNewPassword}
          />
          {(error === 'no-current-password' ||
            error === 'invalid-password') && (
            <Text style={forms.error}>
              Please provide your current password
            </Text>
          )}
        </View>,
        <View key={4} style={forms.formGroup}>
          <Text style={forms.label}>New Password</Text>
          <TextInput
            ref={el => (newPasswordInput = el)}
            style={[
              forms.input,
              focusInput === 'newPassword' && forms.inputFocus,
            ]}
            onChangeText={onNewPasswordChange}
            onFocus={onNewPasswordFocus}
            onBlur={onBlur}
            value={newPassword}
            secureTextEntry={true}
            maxLength={50}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Min 8 chars. No spaces."
            placeholderTextColor={vars.blueGrey100}
            returnKeyType="next"
            onSubmitEditing={focusNewPasswordAgain}
          />
          {error === 'no-new-password' && (
            <Text style={forms.error}>Please provide a new password</Text>
          )}
          {error === 'new-password-short' && (
            <Text style={forms.error}>
              Passwords must be at least 8 characters
            </Text>
          )}
        </View>,
        <View key={5} style={forms.formGroup}>
          <Text style={forms.label}>Repeat New Password</Text>
          <TextInput
            ref={el => (newPasswordAgainInput = el)}
            style={[
              forms.input,
              focusInput === 'newPasswordAgain' && forms.inputFocus,
            ]}
            onChangeText={onNewPasswordAgainChange}
            onFocus={onNewPasswordAgainFocus}
            onBlur={onBlur}
            value={newPasswordAgain}
            secureTextEntry={true}
            maxLength={50}
            editable={!isInFlight}
            spellCheck={false}
            placeholder="Must match new password"
            placeholderTextColor={vars.blueGrey100}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {error === 'password-mismatch' && (
            <Text style={forms.error}>Does not match</Text>
          )}
        </View>,
        <View key={6} style={forms.buttonRow}>
          <View
            style={{
              width: '50%',
              paddingRight: 8,
            }}>
            {getCloseButton({ isInFlight, closeModal })}
          </View>
          <View
            style={{
              width: '50%',
              paddingLeft: 8,
            }}>
            <Button
              onPress={onSubmit}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title={isInFlight ? 'Changing…' : 'Change'}
              disabled={isInFlight}
            />
          </View>
        </View>,
      ]}
    </View>
  );
};
