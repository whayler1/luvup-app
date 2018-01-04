import React, { Component } from 'react';
import { View, Text } from 'react-native';
import superagent from 'superagent';

import config from '../../config.js';
import Template from './SignUp.template';


export default class SignUp extends Component {
  state = {
    email: '',
    error: '',
  };

  onEmailChange = email => this.setState({ email });

  getValidationError = () => {
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      return 'email';
    }
    return '';
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();
    if (errorStr) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '' }, () => {

    });
  }

  render() {
    return <Template
      onEmailChange={this.onEmailChange}
      onSubmit={this.onSubmit}
      {...this.state}
    />;
  }
};
