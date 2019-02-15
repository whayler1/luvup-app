import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { resetPasswordWithGeneratedPassword as resetPasswordWithGeneratedPasswordAction } from '../../redux/user/user.actions';
// import styles from './ResetPasswordWithGeneratedPassword.styles';
import { vars, forms, scene, modal, buttons } from '../../styles';
import { passwordRegex } from '../../helpers';

class ResetPasswordWithGeneratedPassword extends PureComponent {
  static propTypes = {
    generatedPassword: PropTypes.string.isRequired,
    isResetPasswordWithGeneratedPasswordInFlight: PropTypes.bool.isRequired,
    resetPasswordWithGeneratedPasswordError: PropTypes.string.isRequired,
    resetPasswordWithGeneratedPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      focusInput: '',
      newPassword: '',
      newPasswordError: '',
      newPasswordAgain: '',
      newPasswordAgainError: '',
    };
  }

  handleSubmit = () => {
    if (!this.validate()) {
      return;
    }
    const {
      props: { generatedPassword, resetPasswordWithGeneratedPassword },
      state: { newPassword },
    } = this;

    resetPasswordWithGeneratedPassword(generatedPassword, newPassword);
  };

  validate = () => {
    const { newPassword, newPasswordAgain } = this.state;
    const nextState = {
      newPasswordError: '',
      newPasswordAgainError: '',
    };
    let isValid = true;

    if (newPassword.length < 8) {
      nextState.newPasswordError = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!passwordRegex.test(newPassword)) {
      nextState.newPasswordError = 'Please can not contain white space';
      isValid = false;
    } else if (newPassword !== newPasswordAgain) {
      nextState.newPasswordAgainError = 'Passwords do not match';
      isValid = false;
    }
    this.setState(nextState);
    return isValid;
  };

  handleNewPasswordFocus = () => {
    this.setState({ focusInput: 'newPassword' });
  };

  handleNewPasswordBlur = () => {
    this.setState({ focusInput: '' });
  };

  handleNewPasswordChange = newPassword => {
    this.setState({ newPassword });
  };

  focusNewPasswordAgain = () => {
    this.newPasswordAgainEl.focus();
  };

  setNewPasswordAgainEl = el => {
    this.newPasswordAgainEl = el;
  };

  dleNewPasswordAgainFocus = () => {
    this.setState({ focusInput: 'newPasswordAgain' });
  };

  handleNewPasswordAgainBlur = () => {
    this.setState({ focusInput: '' });
  };

  handleNewPasswordAgainChange = newPasswordAgain => {
    this.setState({ newPasswordAgain });
  };

  render() {
    const {
      props: {
        isResetPasswordWithGeneratedPasswordInFlight,
        resetPasswordWithGeneratedPasswordError,
      },
      state: {
        focusInput,
        newPassword,
        newPasswordAgain,
        newPasswordError,
        newPasswordAgainError,
      },
      handleNewPasswordFocus,
      handleNewPasswordBlur,
      handleNewPasswordChange,
      focusNewPasswordAgain,
      handleNewPasswordAgainFocus,
      handleNewPasswordAgainBlur,
      handleNewPasswordAgainChange,
      handleSubmit,
      setNewPasswordAgainEl,
    } = this;
    return (
      <ScrollView style={scene.content}>
        <Text style={modal.title}>Create a New Password</Text>
        <View style={forms.formGroup}>
          <Text style={forms.label}>New Password</Text>
          <TextInput
            style={[
              focusInput === 'newPassword' ? forms.inputFocus : forms.input,
            ]}
            onFocus={handleNewPasswordFocus}
            onBlur={handleNewPasswordBlur}
            onChangeText={handleNewPasswordChange}
            value={newPassword}
            maxLength={50}
            autoCapitalize={'none'}
            editable={!isResetPasswordWithGeneratedPasswordInFlight}
            spellCheck={false}
            placeholder="Min 8 chars. No spaces."
            placeholderTextColor={vars.placeholder}
            returnKeyType="next"
            onSubmitEditing={focusNewPasswordAgain}
          />
          {newPasswordError.length > 0 && (
            <Text style={forms.error}>{newPasswordError}</Text>
          )}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Re-Enter New Password</Text>
          <TextInput
            ref={setNewPasswordAgainEl}
            style={[
              focusInput === 'newPasswordAgain'
                ? forms.inputFocus
                : forms.input,
            ]}
            onFocus={handleNewPasswordAgainFocus}
            onBlur={handleNewPasswordAgainBlur}
            onChangeText={handleNewPasswordAgainChange}
            value={newPasswordAgain}
            maxLength={50}
            autoCapitalize={'none'}
            editable={!isResetPasswordWithGeneratedPasswordInFlight}
            spellCheck={false}
            placeholder="Must match new password"
            placeholderTextColor={vars.placeholder}
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
          />
          {newPasswordAgainError.length > 0 && (
            <Text style={forms.error}>{newPasswordAgainError}</Text>
          )}
        </View>
        <View style={forms.formGroup}>
          <Button
            onPress={handleSubmit}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={
              isResetPasswordWithGeneratedPasswordInFlight
                ? 'Submitting…'
                : 'Submit'
            }
            disabled={isResetPasswordWithGeneratedPasswordInFlight}
          />
          {resetPasswordWithGeneratedPasswordError.length > 0 && (
            <Text style={forms.error}>
              {resetPasswordWithGeneratedPasswordError}
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    isResetPasswordWithGeneratedPasswordInFlight:
      state.user.isResetPasswordWithGeneratedPasswordInFlight,
    resetPasswordWithGeneratedPasswordError:
      state.user.resetPasswordWithGeneratedPasswordError,
  }),
  {
    resetPasswordWithGeneratedPassword: resetPasswordWithGeneratedPasswordAction,
  }
)(ResetPasswordWithGeneratedPassword);
