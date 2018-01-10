import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './SignUpConfirm.template';
import { emailRegex } from '../../helpers';

class SignUpConfirm extends Component {
  static propTypes = {
    email: PropTypes.string,
  };

  state = {
    email: this.props.email || '',
    username: '',
    password: '',
    passwordAgain: '',
    code: '',
    error: '',
  };

  onEmailChange = email => this.setState({ email });
  onUsernameChange = username => this.setState({ username });
  onCodeChange = code => this.setState({ code });
  onPasswordChange = password => this.setState({ password });
  onPasswordAgainChange = passwordAgain => this.setState({ passwordAgain });

  getValidationError = () => {
    const { email, username, code, password, passwordAgain } = this.state;
    if (!emailRegex.test(email)) {
      return 'email';
    }
    if (!username) {
      return 'username';
    }
    if (username.length < 3) {
      return 'username-length';
    }
    if (!code) {
      return 'code';
    }
    if (String(code).length < 6) {
      return 'code-length';
    }
    if (!password) {
      return 'password'
    }
    if (password.length < 6) {
      return 'password-length';
    }
    if (passwordAgain !== password) {
      return 'password-mismatch';
    }
    return '';
  }

  submit = async () => {
    const { email, username, password, code } = this.state;
    try {
      console.log('try');
      const res = await superagent.post(config.graphQlUrl, {
        query: `mutation {
          confirmUser(
            email: "${email}"
            username: "${username}"
            password: "${password}"
            code: ${code}
          ) {
            user {
              id
              email
              local {
                username
              }
            }
            error
          }
        }`
      });

      console.log('res', res.body);

      if (!('body' in res && 'data' in res.body && 'confirmUser' in res.body.data)) {
        this.setState({ error: 'response', isInFlight: false });
      }
      const { error } = res.body.data.confirmUser;
      if (error) {
        this.setState({ error, isInFlight: false });
      } else {
        this.setState({
          error: '',
          isInFlight: false,
        }, () => Actions.login());
      }
    } catch (err) {
      console.log('err', err);
      this.setState({ error: 'response', isInFlight: false });
    }
  }

  onSubmit = () => {
    const errorStr = this.getValidationError();
    console.log('errorStr', errorStr);
    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '', isInFlight: true }, this.submit);
  };

  render() {
    return <Template
      {..._.pick(this,
        'onEmailChange',
        'onUsernameChange',
        'onCodeChange',
        'onPasswordChange',
        'onPasswordAgainChange',
        'onSubmit',
      )}
      {...this.state}
    />;
  };
};

export default connect(
  state => ({
    email: state.user.email
  })
)(SignUpConfirm);
