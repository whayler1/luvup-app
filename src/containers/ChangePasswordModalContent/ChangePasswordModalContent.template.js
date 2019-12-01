import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { modal, forms, vars } from '../../styles';
import Button, { BUTTON_STYLES } from '../../components/Button';
import Input from '../../components/Input';

const getCloseButton = ({ isInFlight, closeModal }) => (
  <Button
    onPress={closeModal}
    buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
    title="Close"
    isInFlight={isInFlight}
  />
);

const gerCurrentPasswordError = (error) => {
  if (error === 'no-current-password' || error === 'invalid-password') {
    return 'Please provide your current password';
  }
  return '';
};

const getNewPasswordError = (error) => {
  if (error === 'no-new-password') {
    return 'Please provide a new password';
  }
  if (error === 'new-password-whitespace') {
    return 'Password can not contain empty spaces';
  }
  if (error === 'new-password-short') {
    return 'Passwords must be at least 8 characters';
  }
  return '';
};

const getPasswordAgainError = (error) => {
  if (error === 'password-mismatch') {
    return 'Does not match';
  }
  return '';
};

export default ({
  currentPassword,
  newPassword,
  newPasswordAgain,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onNewPasswordAgainChange,
  onSubmit,
  closeModal,
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
      }}
    >
      {success && (
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={60}
          color={vars.success}
        />
      )}
      {!success && <Ionicons name="md-unlock" size={60} color={vars.p} />}
      <Text style={modal.title}>Change Password</Text>
      {error === 'server-error' && (
        <Text style={forms.error}>
          {'There was an error submitting your request. This is most likely a connectivity issue.' +
            '\nIf the problem persists please contact justin@luvup.io'}
        </Text>
      )}
      {success && (
        <Fragment>
          <Text key={1} style={modal.copy}>
            Your Password has been changed successully!
          </Text>
          <View key={2} style={forms.buttonRow}>
            <View
              style={{
                flex: 1,
              }}
            >
              {getCloseButton({ isInFlight, closeModal })}
            </View>
          </View>
        </Fragment>
      )}
      {!success && (
        <Fragment>
          <Input
            onChangeText={onCurrentPasswordChange}
            value={currentPassword}
            placeholder="Min 8 chars. No spaces"
            label="Current Password"
            error={gerCurrentPasswordError(error)}
            inputProps={{
              secureTextEntry: true,
              editable: !isInFlight,
              spellCheck: false,
              returnKeyType: 'next',
              onSubmitEditing: focusNewPassword,
            }}
          />
          <Input
            label="New Password"
            onChangeText={onNewPasswordChange}
            value={newPassword}
            placeholder="Min 8 chars. No spaces."
            error={getNewPasswordError(error)}
            inputProps={{
              ref: (el) => {
                newPasswordInput = el;
              },
              secureTextEntry: true,
              editable: !isInFlight,
              spellCheck: false,
              returnKeyType: 'next',
              onSubmitEditing: focusNewPasswordAgain,
            }}
          />
          <Input
            label="Repeat New Password"
            onChangeText={onNewPasswordAgainChange}
            value={newPasswordAgain}
            placeholder="Must match new password"
            error={getPasswordAgainError(error)}
            inputProps={{
              ref: (el) => {
                newPasswordAgainInput = el;
              },
              secureTextEntry: true,
              editable: !isInFlight,
              spellCheck: false,
              returnKeyType: 'go',
              onSubmitEditing: onSubmit,
            }}
          />
          <View key={6} style={forms.buttonRow}>
            <View
              style={{
                width: '50%',
                paddingRight: 8,
              }}
            >
              {getCloseButton({ isInFlight, closeModal })}
            </View>
            <View
              style={{
                width: '50%',
                paddingLeft: 8,
              }}
            >
              <Button
                onPress={onSubmit}
                title="Change"
                isInFlight={isInFlight}
              />
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};
