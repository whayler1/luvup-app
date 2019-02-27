import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { resetPasswordWithGeneratedPassword as resetPasswordWithGeneratedPasswordAction } from '../../redux/user/user.actions';
// import styles from './ResetPasswordWithGeneratedPassword.styles';
import { forms, scene, modal, buttons } from '../../styles';
import { passwordRegex, userLoginRouteSwitch } from '../../helpers';
import Input from '../../components/Input';
import ResetPasswordWithGeneratedPasswordSuccess from './ResetPasswordWithGeneratedPasswordSuccess';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
      isSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isResetPasswordWithGeneratedPasswordInFlight &&
      !this.props.isResetPasswordWithGeneratedPasswordInFlight &&
      this.props.resetPasswordWithGeneratedPasswordError.length < 1
    ) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isSuccess: true });
      /* eslint-enable react/no-did-update-set-state */
    }
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

  handleDone = () => {
    userLoginRouteSwitch();
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
        isSuccess,
      },
      handleNewPasswordChange,
      focusNewPasswordAgain,
      handleNewPasswordAgainChange,
      handleSubmit,
      setNewPasswordAgainEl,
      handleDone,
    } = this;
    if (isSuccess) {
      return <ResetPasswordWithGeneratedPasswordSuccess onDone={handleDone} />;
    }
    return (
      <KeyboardAwareScrollView>
        <View style={scene.content}>
          <Text style={modal.title}>Create a New Password</Text>
          <Input
            label="New Password"
            placeholder="Min 8 chars. No spaces."
            onChangeText={handleNewPasswordChange}
            value={newPassword}
            error={newPasswordError}
            inputProps={{
              testID: 'reset-password-with-generated-password-new-password',
              returnKeyType: 'next',
              onSubmitEditing: focusNewPasswordAgain,
              autoCapitalize: 'none',
              editable: !isResetPasswordWithGeneratedPasswordInFlight,
              secureTextEntry: true,
              spellCheck: false,
              placeholder: '••••••••',
            }}
          />
          <Input
            label="Re-Enter New Password"
            placeholder="Must match new password"
            onChangeText={handleNewPasswordAgainChange}
            value={newPasswordAgain}
            error={newPasswordAgainError}
            inputProps={{
              testID:
                'reset-password-with-generated-password-new-password-again',
              ref: setNewPasswordAgainEl,
              returnKeyType: 'go',
              onSubmitEditing: handleSubmit,
              autoCapitalize: 'none',
              editable: !isResetPasswordWithGeneratedPasswordInFlight,
              secureTextEntry: true,
              spellCheck: false,
              placeholder: '••••••••',
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
        </View>
      </KeyboardAwareScrollView>
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
