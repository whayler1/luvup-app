import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';

import { forms, buttons, modal, scene, vars } from '../../styles';
import Well from '../../components/Well';
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

  _onFocusFunc = title => () => this.setState({ focusInput: title });
  _onChangeFunc = key => val => this.setState({ [key]: val });

  onUsernameFocus = this._onFocusFunc('username');
  onFirstNameFocus = this._onFocusFunc('firstName');
  onLastNameFocus = this._onFocusFunc('lastName');
  onPasswordFocus = this._onFocusFunc('password');
  onPasswordAgainFocus = this._onFocusFunc('passwordAgain');
  onBlur = this._onFocusFunc('');
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
      onUsernameFocus,
      onFirstNameFocus,
      onLastNameFocus,
      onPasswordFocus,
      onPasswordAgainFocus,
      onBlur,
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
    } = this;
    const {
      username,
      firstName,
      lastName,
      password,
      passwordAgain,
      error,
      isInFlight,
      focusInput,
    } = this.state;

    return (
      <KeyboardAvoidingView
        contentContainerStyle={scene.keyboardAvoidingView}
        style={scene.container}
        keyboardVerticalOffset={32}
        behavior="padding">
        <ScrollView style={scene.contentNoTop}>
          <Text style={modal.title}>Create Your Profile</Text>
          <View style={forms.formGroup}>
            <Text style={forms.label}>Username</Text>
            <TextInput
              testID="create-profile-username-input"
              style={[
                focusInput === 'username' ? forms.inputFocus : forms.input,
              ]}
              onFocus={onUsernameFocus}
              onBlur={onBlur}
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
            {error === 'username' && (
              <Text style={forms.error}>Please provide a username</Text>
            )}
            {error === 'username-length' && (
              <Text style={forms.error}>
                Usernames must be at least 3 characters
              </Text>
            )}
            {error === 'username taken' && (
              <Text style={forms.error}>Username taken</Text>
            )}
          </View>
          <View style={styles.formRowWrap}>
            <View style={[forms.formGroup, styles.formRowLeft]}>
              <Text style={forms.label}>First Name</Text>
              <TextInput
                testID="create-profile-firstname-input"
                ref={setFirstNameEl}
                style={[
                  focusInput === 'firstName' ? forms.inputFocus : forms.input,
                ]}
                onFocus={onFirstNameFocus}
                onBlur={onBlur}
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
            <View style={[forms.formGroup, styles.formRowRight]}>
              <Text style={forms.label}>Last Name</Text>
              <TextInput
                testID="create-profile-lastname-input"
                ref={setLastNameEl}
                style={[
                  focusInput === 'lastName' ? forms.inputFocus : forms.input,
                ]}
                onFocus={onLastNameFocus}
                onBlur={onBlur}
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
          </View>
          <View style={forms.formGroup}>
            <Text style={forms.label}>Password</Text>
            <TextInput
              testID="create-profile-password-input"
              ref={setPasswordEl}
              style={[
                focusInput === 'password' ? forms.inputFocus : forms.input,
              ]}
              onFocus={onPasswordFocus}
              onBlur={onBlur}
              onChangeText={onPasswordChange}
              value={password}
              secureTextEntry
              maxLength={50}
              editable={!isInFlight}
              spellCheck={false}
              placeholder="Min 8 Chars. No spaces"
              placeholderTextColor={vars.placeholder}
              returnKeyType="next"
              onSubmitEditing={focusPasswordAgainEl}
            />
            {error === 'password' && (
              <Text style={forms.error}>Please provide a password</Text>
            )}
            {error === 'password-length' && (
              <Text style={forms.error}>
                Passwords must be at least 8 characters
              </Text>
            )}
          </View>
          <View style={forms.formGroup}>
            <Text style={forms.label}>Re-Enter Password</Text>
            <TextInput
              testID="create-profile-passwordagain-input"
              ref={setPasswordAgainEl}
              style={[
                focusInput === 'passwordAgain' ? forms.inputFocus : forms.input,
              ]}
              onFocus={onPasswordAgainFocus}
              onBlur={onBlur}
              onChangeText={onPasswordAgainChange}
              value={passwordAgain}
              secureTextEntry
              maxLength={50}
              editable={!isInFlight}
              spellCheck={false}
              placeholder="Must match password"
              placeholderTextColor={vars.placeholder}
              returnKeyType="go"
              onSubmitEditing={onSubmit}
            />
            {error === 'password-mismatch' && (
              <Text style={forms.error}>Passwords do not match</Text>
            )}
          </View>
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
