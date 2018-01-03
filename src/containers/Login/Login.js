import React, { Component } from 'react';
import { View, Text } from 'react-native';
import superagent from 'superagent';

import config from '../../config.js';
import Template from './Login.template';


export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });

  onSubmit = async (username, password) => {
    try {
      const res = await superagent.post(`${config.baseUrl}login`, {
        username,
        password,
      });

      console.log('res!', res);
    } catch(err) {
      console.error('error', err);
    }
  }

  render() {
    const { username, password } = this.state;

    return <Template
      onSubmit={this.onSubmit}
      onUsernameChange={this.onUsernameChange}
      onPasswordChange={this.onPasswordChange}
      username={username}
      password={password}
    />;
  }
};
