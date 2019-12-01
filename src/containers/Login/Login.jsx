import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './Login.styles';
import { scene, forms } from '../../styles';
import { login as loginAction } from '../../redux/user/user.actions';
import Input from '../../components/Input';
import Well from '../../components/Well';
import FormScene from '../../components/FormScene';
import Button, { BUTTON_STYLES } from '../../components/Button';

let passwordInput;
const focusPassword = () => passwordInput.focus();

class Login extends Component {
  static propTypes = {
    username: PropTypes.string,
    login: PropTypes.func.isRequired,
    getMeErrorMessage: PropTypes.string.isRequired,
    isLoginInFlight: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired,
  };

  static defaultProps = {
    username: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      password: '',
      error: '',
    };
  }

  handleUsernameChange = (username) => {
    this.setState({ username });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  getValidationError = () => {
    const { username, password } = this.state;
    if (!username) {
      return 'username';
    }
    if (!password) {
      return 'password';
    }
    return '';
  };

  getFormattedLoginError() {
    const { loginError } = this.props;
    if (loginError === 'Unsuccessful HTTP response') {
      return 'Invalid email or password';
    }
    return loginError;
  }

  navigateToSignUp = () => Actions.signup();
  navigateToSignUpConfirm = () => Actions.confirmUserRequestCode();
  navigateToForgotPassword = () => Actions.forgotPassword();

  submit = async () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  handleSubmit = () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    this.submit();
  };

  setPasswordInputRef = (el) => {
    passwordInput = el;
  };

  render() {
    const {
      navigateToSignUpConfirm,
      navigateToSignUp,
      navigateToForgotPassword,
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      setPasswordInputRef,
      state: { username, password, error },
      props: { getMeErrorMessage, isLoginInFlight: isInFlight, loginError },
    } = this;

    return (
      <FormScene>
        <Text testID="login-title" style={[scene.titleCopy, scene.textCenter]}>
          Login
        </Text>
        <Input
          label="Email"
          onChangeText={handleUsernameChange}
          value={username}
          placeholder="jane.doe@email.com"
          error={error === 'username' ? 'Please provide a valid email' : ''}
          inputProps={{
            autoCapitalize: 'none',
            editable: !isInFlight,
            spellCheck: false,
            keyboardType: 'email-address',
            returnKeyType: 'next',
            onSubmitEditing: focusPassword,
            testID: 'login-email-input',
          }}
        />
        <Input
          label="Password"
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="••••••••"
          error={error === 'password' ? 'Please provide a password' : ''}
          inputProps={{
            ref: setPasswordInputRef,
            secureTextEntry: true,
            editable: !isInFlight,
            spellCheck: false,
            returnKeyType: 'go',
            onSubmitEditing: handleSubmit,
            testID: 'login-password-input',
          }}
        />
        {loginError.length > 0 && <Well text={this.getFormattedLoginError()} />}
        {getMeErrorMessage.length > 0 && (
          <Well text={`Error retrieving user data: ${getMeErrorMessage}`} />
        )}
        <View style={forms.buttonRow}>
          <View style={styles.submitContainer}>
            <Button
              onPress={handleSubmit}
              title="Submit"
              isInFlight={isInFlight}
              testID="login-submit"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            accessibilityLabel="Forgot your password"
            onPress={navigateToForgotPassword}
            style={styles.forgotPasswordButton}
          >
            <Text style={[scene.bodyCopy, styles.forgotPasswordText]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noAccountTextContainer}>
          <Text style={scene.bodyCopy}>{"Don't have an account?"}</Text>
        </View>
        <View style={[forms.buttonRow, styles.noAccountButtonRow]}>
          <View style={styles.confirmCodeWrapper}>
            <Button
              onPress={navigateToSignUpConfirm}
              buttonStyles={BUTTON_STYLES.SECONDARY_SKELETON}
              title="Confirm Code"
            />
          </View>
          <View style={styles.signUpWrapper}>
            <Button
              testID="login-signup"
              onPress={navigateToSignUp}
              buttonStyles={BUTTON_STYLES.INFO_SKELETON}
              title="Sign Up"
            />
          </View>
        </View>
      </FormScene>
    );
  }
}

export default connect(
  (state) => ({
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
    getMeErrorMessage: state.user.getMeErrorMessage,
    isLoginInFlight: state.user.isLoginInFlight,
    loginError: state.user.loginError,
  }),
  {
    login: loginAction,
  },
)(Login);
