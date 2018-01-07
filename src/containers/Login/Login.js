import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import Template from './Login.template';


export default class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  }

  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });

  getValidationError = () => {
    const { username, password } = this.state;
    if (!username) {
      return 'username';
    }
    if (!password) {
      return 'password';
    }
    return '';
  }

  navigateToSignUp = () => Actions.signup();
  navigateToSignUpConfirm = () => Actions.signupconfirm();

  onSubmit = async () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    const { username, password } = this.state;
    try {
      const res = await superagent.post(`${config.baseUrl}/login`, {
        username,
        password
      });

      console.log('Login res!', res.body);
    } catch(err) {
      this.setState({ error: 'server' });
      console.log('error', err);
    }
  }

  render() {
    const { username, password, error } = this.state;

    return <Template
      navigateToSignUpConfirm={this.navigateToSignUpConfirm}
      navigateToSignUp={this.navigateToSignUp}
      onSubmit={this.onSubmit}
      onUsernameChange={this.onUsernameChange}
      onPasswordChange={this.onPasswordChange}
      username={username}
      password={password}
      error={error}
    />;
  }
};
