import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import Template from './Login.template';
import { login as loginAction } from '../../redux/user/user.actions';

class Login extends Component {
  static propTypes = {
    userId: PropTypes.string,
    login: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
    error: '',
    isInFlight: false,
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

  submit = async () => {
    const { username, password } = this.state;
    const loginres = await this.props.login(username, password);
    console.log('loginres', loginres);

    console.log('userId', this.props.userId);
    if (this.props.userId) {
      Actions.dashboard();
      return;
    }
    this.setState({ error: 'server' });
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    this.setState({ isInFlight: true }, this.submit);
  }

  render() {
    const { username, password, error } = this.state;
    console.log('config', config.baseUrl);

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

export default connect(
  state => ({
    userId: state.user.id,
  }),
  {
    login: loginAction
  }
)(Login);
