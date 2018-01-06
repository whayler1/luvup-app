import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import { emailRegex } from '../../helpers';
import Template from './SignUp.template';


export default class SignUp extends Component {
  state = {
    email: '',
    error: '',
    isInFlight: false,
  };

  onEmailChange = email => this.setState({ email });

  getValidationError = () => {
    if (!emailRegex.test(this.state.email)) {
      return 'email';
    }
    return '';
  };

  submit = async () => {
    try {
      const { email } = this.state;
      const res = await superagent.post(config.graphQlUrl, {
        query: `mutation {
          userRequest( email: "${email}") {
            email error
          }
        }`
      });

      console.log('res!', res.body);

      if (!('body' in res && 'data' in res.body && 'userRequest' in res.body.data)) {
        this.setState({ error: 'response', isInFlight: false });
      }
      const { error } = res.body.data.userRequest;
      if (error) {
        this.setState({ error, isInFlight: false });
      } else {
        this.setState({
          error: '',
          isInFlight: false,
        }, () => Actions.signupconfirm());
      }
    } catch (err) {
      console.log('err :(', err);
      this.setState({ error: 'response', isInFlight: false });
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
