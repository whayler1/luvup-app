import React, { Component } from 'react';
import { View, Text } from 'react-native';
import superagent from 'superagent';

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

  getError = () => {
    const { username, password } = this.state;
    if (!username) {
      return 'username';
    }
    if (!password) {
      return 'password';
    }
    return '';
  }

  onSubmit = async () => {
    const errorStr = this.getError();
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

      console.log('res!', res);
    } catch(err) {
      console.log('error', err);
    }
  }

  render() {
    const { username, password, error } = this.state;

    return <Template
      onSubmit={this.onSubmit}
      onUsernameChange={this.onUsernameChange}
      onPasswordChange={this.onPasswordChange}
      username={username}
      password={password}
      error={error}
    />;
  }
};
