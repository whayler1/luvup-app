import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { resetPasswordWithGeneratedPassword as resetPasswordWithGeneratedPasswordAction } from '../../redux/user/user.actions';
// import styles from './ResetPasswordWithGeneratedPassword.styles';
import { forms, scene, modal, buttons } from '../../styles';
import { passwordRegex } from '../../helpers';
import Input from '../../components/Input';

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

  handleNewPasswordChange = newPassword => {
    this.setState({ newPassword });
  };

  focusNewPasswordAgain = () => {
    this.newPasswordAgainEl.focus();
  };

  setNewPasswordAgainEl = el => {
    this.newPasswordAgainEl = el;
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
        newPassword,
        newPasswordAgain,
        newPasswordError,
        newPasswordAgainError,
      },
      handleNewPasswordChange,
      focusNewPasswordAgain,
      handleNewPasswordAgainChange,
      handleSubmit,
      setNewPasswordAgainEl,
    } = this;
    return (
      <ScrollView style={scene.content}>
        <Text style={modal.title}>Create a New Password</Text>
        <Input
          label="New Password"
          placeholder="Min 8 chars. No spaces."
          onChangeText={handleNewPasswordChange}
          value={newPassword}
          error={newPasswordError}
          inputProps={{
            returnKeyType: 'next',
            onSubmitEditing: focusNewPasswordAgain,
            autoCapitalize: 'none',
            editable: !isResetPasswordWithGeneratedPasswordInFlight,
            secureTextEntry: true,
            spellCheck: false,
          }}
        />
        <Input
          label="Re-Enter New Password"
          placeholder="Must match new password"
          onChangeText={handleNewPasswordAgainChange}
          value={newPasswordAgain}
          error={newPasswordAgainError}
          inputProps={{
            ref: setNewPasswordAgainEl,
            returnKeyType: 'go',
            onSubmitEditing: handleSubmit,
            autoCapitalize: 'none',
            editable: !isResetPasswordWithGeneratedPasswordInFlight,
            secureTextEntry: true,
            spellCheck: false,
          }}
        />
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
