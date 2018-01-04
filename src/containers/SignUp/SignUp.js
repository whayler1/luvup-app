import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import Template from './SignUp.template';


export default class SignUp extends Component {
  state = {
    email: '',
    error: '',
    isInFlight: false,
    success: false,
  };

  onEmailChange = email => this.setState({ email });

  getValidationError = () => {
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      return 'email';
    }
    return '';
  };

  submit = async () => {
    try {
      const res = await superagent.post(config.graphQlUrl, {
        query: `mutation {
          userRequest( email: "${this.state.email}") {
            email error
          }
        }`
      });

      console.log('res!', res.body);

      const { error } = res.body.data.userRequest;
      if (error) {
        this.setState({ error, isInFlight: false });
      }

      this.setState({
        error: '',
        isInFlight: false,
        success: true,
      }, () => Actions.signupconfirm());
    } catch (err) {
      console.log('err :(', err);
    }
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();
    if (errorStr) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: errorStr, isInFlight: true }, this.submit);
  };

  render() {
    return <Template
      onEmailChange={this.onEmailChange}
      onSubmit={this.onSubmit}
      {...this.state}
    />;
  };
};
