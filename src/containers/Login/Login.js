import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import { Button } from 'react-native-elements';

import styles from './Login.styles';
import { scene, forms, buttons, wells } from '../../styles';
import {
  userLoginRouteSwitch,
  registerForPushNotifications,
} from '../../helpers';
import { login as loginAction } from '../../redux/user/user.actions';
import Input from '../../components/Input';
import Button, { BUTTON_STYLES } from '../../components/Button';

let passwordInput;
const focusPassword = () => passwordInput.focus();

class Login extends Component {
  static propTypes = {
    userId: PropTypes.string,
    username: PropTypes.string,
    isReset: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    getMeErrorMessage: PropTypes.string.isRequired,
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
      isInFlight: false,
    };
  }

  handleUsernameChange = username => {
    this.setState({ username });
  };
  handlePasswordChange = password => {
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

  navigateToSignUp = () => Actions.signup();
  navigateToSignUpConfirm = () => Actions.confirmUserRequestCode();
  navigateToForgotPassword = () => Actions.forgotPassword();

  submit = async () => {
    const { username, password } = this.state;
    await this.props.login(username, password);

    if (this.props.isReset) {
      Actions.resetPasswordWithGeneratedPassword({
        generatedPassword: password,
      });
    } else if (this.props.userId) {
      registerForPushNotifications();
      userLoginRouteSwitch();
    } else {
      this.setState({
        error: 'server',
        isInFlight: false,
      });
    }
  };

  handleSubmit = () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    this.setState({ isInFlight: true }, this.submit);
  };

  setPasswordInputRef = el => {
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
      state: { username, password, error, isInFlight },
      props: { getMeErrorMessage },
    } = this;

    return (
      <KeyboardAvoidingView style={scene.container} behavior="padding">
        <ScrollView
          testID="login-scroll-view"
          style={scene.content}
          contentContainerStyle={scene.contentTop}>
          <Text
            testID="login-title"
            style={[scene.titleCopy, scene.textCenter]}>
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
          {(error === 'credentials' || error === 'server') && (
            <View style={[wells.error, styles.wellError]}>
              <Text style={wells.errorText}>Invalid email or password</Text>
            </View>
          )}
          {getMeErrorMessage.length > 0 && (
            <View style={[wells.error, styles.wellError]}>
              <Text style={wells.errorText}>{getMeErrorMessage}</Text>
            </View>
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
              style={styles.forgotPasswordButton}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    userId: state.user.id,
    isReset: state.user.isReset,
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
    getMeErrorMessage: state.user.getMeErrorMessage,
  }),
  {
    login: loginAction,
  }
)(Login);
