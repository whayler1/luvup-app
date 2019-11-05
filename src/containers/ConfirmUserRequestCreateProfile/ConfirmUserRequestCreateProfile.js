import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { forms, scene } from '../../styles';
import Well from '../../components/Well';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  confirmUser as confirmUserAction,
  clearConfirmUserRequestFailure,
} from '../../redux/user/user.actions';
import styles from './ConfirmUserRequestCreateProfile.styles';
import { store } from '../../redux';

class ConfirmUserRequestCreateProfile extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    code: PropTypes.string,
    confirmUser: PropTypes.func.isRequired,
    isConfirmUserInFlight: PropTypes.string.isRequired,
    confirmUserError: PropTypes.string.isRequired,
  };

  static onEnter() {
    store.dispatch(clearConfirmUserRequestFailure());
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordAgain: '',
      error: '',
      focusInput: '',
    };
  }

  _onChangeFunc = key => val => this.setState({ [key]: val, error: '' });

  handleUsernameChange = this._onChangeFunc('username');
  handleFirstNameChange = this._onChangeFunc('firstName');
  handleLastNameChange = this._onChangeFunc('lastName');
  handlePasswordChange = this._onChangeFunc('password');
  handlePasswordAgainChange = this._onChangeFunc('passwordAgain');

  setUsernameRef(el) {
    this.usernameRef = el;
  }
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
    const {
      username,
      firstName,
      lastName,
      password,
      passwordAgain,
    } = this.state;
    if (!username) {
      return 'username';
    }
    if (username.length < 3) {
      return 'username-length';
    }
    if (firstName.length < 3) {
      return 'firstname-length';
    }
    if (lastName.length < 3) {
      return 'lastname-length';
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

  getFirstNameError = () => {
    const { error } = this.state;
    if (error === 'firstname-length') {
      return 'First name must be at least 3 characters';
    }
    return '';
  };

  getLastNameError = () => {
    const { error } = this.state;
    if (error === 'lastname-length') {
      return 'Last name must be at least 3 characters';
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

  getIsInFlight = () => this.props.isConfirmUserInFlight;

  getIoError = () => this.props.confirmUserError;

  handleSumbit = () => {
    const errorStr = this.getValidationError();

    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    const { email, code } = this.props;
    const { username, firstName, lastName, password } = this.state;
    this.props.confirmUser(
      email,
      username,
      firstName,
      lastName,
      code,
      password
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.passwordAgain.length !== this.state.passwordAgain.length &&
      this.getValidationError === ''
    ) {
      this.handleSumbit();
    }
  }

  render() {
    const {
      handleUsernameChange,
      handleFirstNameChange,
      handleLastNameChange,
      handlePasswordChange,
      handlePasswordAgainChange,
      handleSumbit,
      setUsernameRef,
      setFirstNameEl,
      setLastNameEl,
      setPasswordEl,
      setPasswordAgainEl,
      focusFirstName,
      focusLastNameEl,
      focusPasswordEl,
      focusPasswordAgainEl,
      getUsernameError,
      getFirstNameError,
      getLastNameError,
      getPasswordError,
      getReEnterPasswordError,
      getIsInFlight,
      getIoError,
      state: { username, firstName, lastName, password, passwordAgain },
    } = this;

    const isInFlight = getIsInFlight();
    const ioError = getIoError();

    return (
      <KeyboardAwareScrollView
        style={styles.keyboardScrollView}
        contentContainerStyle={scene.contentNoTop}>
        <View style={[scene.contentTop, styles.contentNoTop]}>
          <Text style={[scene.titleCopy, scene.textCenter]}>
            Create Your Profile
          </Text>
          <Input
            {...{
              ref: setUsernameRef,
              label: 'Username',
              onChangeText: handleUsernameChange,
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
                onChangeText: handleFirstNameChange,
                value: firstName,
                placeholder: 'Jane',
                error: getFirstNameError(),
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
                onChangeText: handleLastNameChange,
                value: lastName,
                placeholder: 'Doe',
                error: getLastNameError(),
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
              onChangeText: handlePasswordChange,
              value: password,
              placeholder: 'Min 8 Chars. No spaces',
              error: getPasswordError(),
              inputProps: {
                testID: 'create-profile-password-input',
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
              onChangeText: handlePasswordAgainChange,
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
                onSubmitEditing: handleSumbit,
              },
            }}
          />
          {_.isString(ioError) && ioError.length > 0 && (
            <View style={styles.errorWell}>
              <Well text={ioError} />
            </View>
          )}
          <View style={[forms.buttonRow, styles.buttonRow]}>
            <View style={styles.submitWrap}>
              <Button
                onPress={handleSumbit}
                isInFlight={isInFlight}
                title="Submit"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({
    email: state.user.email,
    code: state.user.code,
    isConfirmUserInFlight: state.user.isConfirmUserInFlight,
    confirmUserError: state.user.confirmUserError,
  }),
  {
    confirmUser: confirmUserAction,
  }
)(ConfirmUserRequestCreateProfile);
