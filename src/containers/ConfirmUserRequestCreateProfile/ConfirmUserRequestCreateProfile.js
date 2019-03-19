import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

import { forms, buttons, scene } from '../../styles';
import Well from '../../components/Well';
import Input from '../../components/Input';
import {
  confirmUser as confirmUserAction,
  login as loginAction,
  getMe as getMeAction,
} from '../../redux/user/user.actions';
import styles from './ConfirmUserRequestCreateProfile.styles';

class ConfirmUserRequestCreateProfile extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    code: PropTypes.string,
    confirmUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordAgain: '',
    error: '',
    isInFlight: false,
    focusInput: '',
  };

  _onChangeFunc = key => val => this.setState({ [key]: val });

  onUsernameChange = this._onChangeFunc('username');
  onFirstNameChange = this._onChangeFunc('firstName');
  onLastNameChange = this._onChangeFunc('lastName');
  onPasswordChange = this._onChangeFunc('password');
  onPasswordAgainChange = this._onChangeFunc('passwordAgain');

  setFirstNameEl(el) {
    this.firstNameEl = el;
  }
  setLastNameEl(el) {
    this.lastNameEl = el;
  }
  setPasswordEl(el) {
    this.passwordEl = el;
  }
  setPasswordAgainEl(el) {
    this.passwordAgainEl = el;
  }

  focusFirstName() {
    this.firstNameEl.focus();
  }
  focusLastNameEl() {
    this.lastNameEl.focus();
  }
  focusPasswordEl() {
    this.passwordEl.focus();
  }
  focusPasswordAgainEl() {
    this.passwordAgainEl.focus();
  }

  getValidationError = () => {
    const { username, password, passwordAgain } = this.state;
    if (!username) {
      return 'username';
    }
    if (username.length < 3) {
      return 'username-length';
    }
    if (!password) {
      return 'password';
    }
    if (password.length < 6) {
      return 'password-length';
    }
    if (passwordAgain !== password) {
      return 'password-mismatch';
    }
    return '';
  };

  getUsernameError = () => {
    const { error } = this.state;
    if (error === 'username') {
      return 'Please provide a username';
    }
    if (error === 'username-length') {
      return 'Usernames must be at least 3 characters';
    }
    if (error === 'username taken') {
      return 'Username taken';
    }
    return '';
  };

  getPasswordError = () => {
    const { error } = this.state;
    if (error === 'password') {
      return 'Please provide a password';
    }
    if (error === 'password-length') {
      return 'Passwords must be at least 8 characters';
    }
    return '';
  };

  getReEnterPasswordError = () => {
    const { error } = this.state;
    if (error === 'password-mismatch') {
      return 'Passwords do not match';
    }
    return '';
  };

  login = async () => {
    const { username, password } = this.state;

    await this.props.login(username, password);
    await this.props.getMe();

    Actions.createloverrequest();
  };

  submit = async () => {
    const { email, code } = this.props;
    const { username, firstName, lastName, password } = this.state;
    const res = await this.props.confirmUser(
      email,
      username,
      firstName,
      lastName,
      code,
      password
    );

    if (!_.at(res, 'body.data.confirmUser')[0]) {
      this.setState({ error: 'response', isInFlight: false });
    } else {
      const { error } = res.body.data.confirmUser;
      if (error) {
        this.setState({ error, isInFlight: false });
      } else {
        this.login();
      }
    }
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();

    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '', isInFlight: true }, this.submit);
  };

  render() {
    const {
      onUsernameChange,
      onFirstNameChange,
      onLastNameChange,
      onPasswordChange,
      onPasswordAgainChange,
      onSubmit,
      setFirstNameEl,
      setLastNameEl,
      setPasswordEl,
      setPasswordAgainEl,
      focusFirstName,
      focusLastNameEl,
      focusPasswordEl,
      focusPasswordAgainEl,
      getUsernameError,
      getPasswordError,
      getReEnterPasswordError,
      state: {
        username,
        firstName,
        lastName,
        password,
        passwordAgain,
        error,
        isInFlight,
      },
    } = this;

    return (
      <KeyboardAvoidingView
        style={scene.container}
        contentContainerStyle={scene.contentNoTop}
        behavior="padding">
        <ScrollView style={scene.contentTop}>
          <Text style={scene.titleCopy}>Create Your Profile</Text>
          <Input
            {...{
              label: 'Username',
              onChangeText: onUsernameChange,
              value: username,
              placeholder: 'Min 8 chars. No spaces.',
              error: getUsernameError(),
              inputProps: {
                testID: 'create-profile-username-input',
                editable: !isInFlight,
                spellCheck: false,
                returnKeyType: 'next',
                onSubmitEditing: focusFirstName,
              },
            }}
          />
          <View style={styles.formRowWrap}>
            <Input
              {...{
                label: 'First Name',
                onChangeText: onFirstNameChange,
                value: firstName,
                placeholder: 'Jane',
                inputProps: {
                  ref: setFirstNameEl,
                  testID: 'create-profile-firstname-input',
                  editable: !isInFlight,
                  spellCheck: false,
                  returnKeyType: 'next',
                  onSubmitEditing: focusLastNameEl,
                },
                formGroupStyles: [styles.formRowLeft],
              }}
            />
            <Input
              {...{
                label: 'Last Name',
                onChangeText: onLastNameChange,
                value: lastName,
                placeholder: 'Doe',
                inputProps: {
                  ref: setLastNameEl,
                  testID: 'create-profile-lastname-input',
                  editable: !isInFlight,
                  spellCheck: false,
                  returnKeyType: 'next',
                  onSubmitEditing: focusPasswordEl,
                },
                formGroupStyles: [styles.formRowRight],
              }}
            />
          </View>
          <Input
            {...{
              label: 'Password',
              testID: 'create-profile-password-input',
              onChangeText: onPasswordChange,
              value: password,
              placeholder: 'Min 8 Chars. No spaces',
              error: getPasswordError(),
              inputProps: {
                secureTextEntry: true,
                editable: !isInFlight,
                spellCheck: false,
                returnKeyType: 'next',
                onSubmitEditing: focusPasswordAgainEl,
                ref: setPasswordEl,
              },
            }}
          />
          <Input
            {...{
              label: 'Re-Enter Password',
              onChangeText: onPasswordAgainChange,
              value: passwordAgain,
              placeholder: 'Must match password',
              error: getReEnterPasswordError(),
              inputProps: {
                testID: 'create-profile-passwordagain-input',
                ref: setPasswordAgainEl,
                secureTextEntry: true,
                editable: !isInFlight,
                spellCheck: false,
                returnKeyType: 'go',
                onSubmitEditing: onSubmit,
              },
            }}
          />
          {error === 'response' && (
            <Well text="There was an error confirming signup" />
          )}
          {error === 'user request used' && (
            <Well text="This user already exists" />
          )}
          <View style={forms.buttonRow}>
            <View style={styles.submitWrap}>
              <Button
                onPress={onSubmit}
                containerViewStyle={buttons.infoContainer}
                buttonStyle={buttons.infoButton}
                textStyle={buttons.infoText}
                disabled={isInFlight}
                title={isInFlight ? 'Submitting…' : 'Submit'}
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
    email: state.user.email,
    code: state.user.code,
  }),
  {
    confirmUser: confirmUserAction,
    login: loginAction,
    getMe: getMeAction,
  }
)(ConfirmUserRequestCreateProfile);
