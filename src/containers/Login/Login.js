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
    email: PropTypes.string,
    login: PropTypes.func.isRequired,
  };

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
    const loginres = await this.props.login(username, password);
    console.log('loginres', loginres);

    console.log('email', this.props.email);
    Actions.dashboard();
    // try {
    //   const res = await superagent.post(`${config.baseUrl}/login`, {
    //     username,
    //     password
    //   });
    //
    //   console.log('Login res!', res.body);
    //   await AsyncStorage.setItem('id_token', res.body.id_token);
    //   Actions.dashboard();
    // } catch(err) {
    //   this.setState({ error: 'server' });
    //   console.log('error', err);
    // }
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

export default connect(
  state => ({
    email: state.user.email,
  }),
  {
    login: loginAction
  }
)(Login);
