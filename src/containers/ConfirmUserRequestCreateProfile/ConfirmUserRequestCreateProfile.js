import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './ConfirmUserRequestCreateProfile.template';
import { emailRegex } from '../../helpers';
import {
  confirmUser as confirmUserAction,
  login as loginAction,
  getMe as getMeAction,
} from '../../redux/user/user.actions';

class ConfirmUserRequestCreateProfile extends Component {
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

    const res = await this.props.login(username, password);
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
    return (
      <Template
        {..._.pick(
          this,
          'onUsernameFocus',
          'onFirstNameFocus',
          'onLastNameFocus',
          'onPasswordFocus',
          'onPasswordAgainFocus',
          'onBlur',
          'onUsernameChange',
          'onFirstNameChange',
          'onLastNameChange',
          'onPasswordChange',
          'onPasswordAgainChange',
          'onSubmit'
        )}
        {...this.state}
      />
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
