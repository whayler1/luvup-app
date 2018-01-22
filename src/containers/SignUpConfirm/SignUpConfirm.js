import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './SignUpConfirm.template';
import { emailRegex } from '../../helpers';
import {
  confirmUser as confirmUserAction,
  login as loginAction
} from '../../redux/user/user.actions';

class SignUpConfirm extends Component {
  static propTypes = {
    email: PropTypes.string,
    confirmUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: this.props.email || '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordAgain: '',
    code: '',
    error: '',
  };

  onEmailChange = email => this.setState({ email });
  onUsernameChange = username => this.setState({ username });
  onFirstNameChange = firstName => this.setState({ firstName });
  onLastNameChange = lastName => this.setState({ lastName });
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

  login = async () => {
    const { username, password } = this.state;

    const res = await this.props.login(username, password);

    Actions.dashboard();
  };

  submit = async () => {
    const { email, username, firstName, lastName, password, code } = this.state;
    const res = await this.props.confirmUser(email, username, firstName, lastName, code, password);
    console.log('\n\n-- res', res.body);

    if (!(_.at(res, 'body.data.confirmUser')[0])) {
      console.log('\n\n-- first error');
      this.setState({ error: 'response', isInFlight: false });
    } else {
      console.log('\n\n-- second error');
      const { error } = res.body.data.confirmUser;
      if (error) {
        console.log('\n\n-- first error inner if');
        this.setState({ error, isInFlight: false });
      } else {
        console.log('\n\n-- first error inner else');
        this.setState({
          error: '',
          isInFlight: false,
        }, () => this.login());
      }
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
        'onFirstNameChange',
        'onLastNameChange',
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
  }),
  {
    confirmUser: confirmUserAction,
    login: loginAction,
  }
)(SignUpConfirm);
